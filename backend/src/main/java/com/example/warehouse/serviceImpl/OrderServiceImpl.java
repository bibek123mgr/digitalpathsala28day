package com.example.warehouse.serviceImpl;

import com.example.warehouse.constants.WASConstants;
import com.example.warehouse.dto.AddOrderRequestDto;
import com.example.warehouse.dto.OrderResponseDto;
import com.example.warehouse.entity.*;
import com.example.warehouse.repo.OrderRepo;
import com.example.warehouse.repo.StockRepo;
import com.example.warehouse.service.OrderService;
import com.example.warehouse.utils.CommonServices;
import com.example.warehouse.utils.WASUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private StockRepo stockRepo;

    @Autowired
    private CommonServices commonServices;

    @Override
    public ResponseEntity<String> createNewOrder(AddOrderRequestDto order) {
        try {
            Authentication authentication= SecurityContextHolder.createEmptyContext().getAuthentication();
            UserPrincipal userPrincipal=(UserPrincipal) authentication.getPrincipal();

            Integer userId=userPrincipal.getId();

            Integer transactionId=commonServices.getTransactionId();
            Order savedOrder=orderRepo.save(mapSaveOrderDateToEntity(order,transactionId,userId));
            List<AddOrderRequestDto.Product> products = order.getOrder();
            for(AddOrderRequestDto.Product product : products) {
                Stock stock = stockRepo.save(mapSaveStockDataToEntity(product, transactionId, userId));
            }
            return WASUtils.getResponse("Order created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error in createNewOrder: {}", e.getMessage(), e);
            return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Order mapSaveOrderDateToEntity(AddOrderRequestDto reqOrder,Integer transactionId,Integer userId){
        User user=new User();
        user.setId(userId);

        Order order=new Order();
        order.setName(reqOrder.getName());
        order.setAddress(reqOrder.getAddress());
        order.setContactNumber(reqOrder.getContactNumber());
        order.setTransactionId(transactionId);
        order.setStatus(true);
        order.setCreatedBy(user);
        return order;
    }

    private Stock mapSaveStockDataToEntity(AddOrderRequestDto.Product product,Integer transactionId,Integer userId){
        User user=new User();
        user.setId(userId);
        BigDecimal totalAmount = product.getPerOrderQty().multiply(BigDecimal.valueOf(product.getOrderQty()));


        Supplier supplier=new Supplier();
        supplier.setId(product.getSupplierId());

        Stock stock=new Stock();
        stock.setStockOut(product.getOrderQty());
        stock.setPerStockOutPrice(product.getPerOrderQty());
        stock.setCreatedBy(user);
        stock.setSupplier(supplier);
        stock.setTransactionId(transactionId);
        stock.setComesFrom("SALES");
        stock.setStockOutAmount(totalAmount);
        stock.setBatchCode(product.getBatchCode());

        return stock;

    }

    @Override
    public ResponseEntity<String> updateOrder(AddOrderRequestDto order, Integer id) {
        try {
            // TODO: implement update logic
            return WASUtils.getResponse("Order updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error in updateOrder: {}", e.getMessage(), e);
            return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<OrderResponseDto>> getAllOrders() {
        try {
            List<Order> orders = orderRepo.findAll();
            List<OrderResponseDto> orderResponseDtos = orders.stream()
                    .map(this::mapOrderToDto)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(orderResponseDtos, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error in getAllOrders: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @Override
    public ResponseEntity<OrderResponseDto> getParticularOrders(Integer id) {
        try {
            Optional<Order> optionalOrder =orderRepo.findById(id);
            if(optionalOrder.isPresent()){
                Order order=optionalOrder.get();
                OrderResponseDto orderResponseDto=mapOrderToDto(order);
                return new ResponseEntity<>(orderResponseDto, HttpStatus.OK);
            }else{
                return new ResponseEntity<>(new OrderResponseDto(), HttpStatus.OK);
            }
        } catch (Exception e) {
            log.error("Error in getParticularOrders: {}", e.getMessage(), e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private OrderResponseDto mapOrderToDto(Order order) {
        OrderResponseDto orderResponse=new OrderResponseDto();
        List<Stock> stocks=stockRepo.findAllByTransactionIdAndStatusTrue(order.getTransactionId());

        if (stocks.isEmpty()) {
            log.warn("No stock entries found for transactionId: {}", order.getTransactionId());
        }

        orderResponse.setId(order.getId());
        orderResponse.setName(order.getName());
        orderResponse.setAddress(order.getAddress());
        orderResponse.setContactNumber(order.getContactNumber());
        orderResponse.setCreatedBy(order.getCreatedBy().getUserName());
        orderResponse.setCreatedAt(order.getCreatedAt());

        List<OrderResponseDto.Product> productList = mapStocksToProducts(stocks);
        orderResponse.setOrder(productList);

        BigDecimal totalAmount=productList.stream()
                .map(OrderResponseDto.Product::getTotalAmount)
                .reduce(BigDecimal.ZERO,BigDecimal::add);

        orderResponse.setTotalAmount(totalAmount);
        return orderResponse;
    }


    private List<OrderResponseDto.Product> mapStocksToProducts(List<Stock> stocks) {
        List<OrderResponseDto.Product> productList = new ArrayList<>();
        for (Stock stock : stocks) {
            OrderResponseDto.Product product = new OrderResponseDto.Product();
            product.setId(stock.getId());
            product.setProductId(stock.getProduct().getId());
            product.setProductName(stock.getProduct().getName());
            product.setImageUrl(stock.getProduct().getImageUrl());
            product.setOrderQty(stock.getStockOut());
            product.setPerOrderQty(stock.getPerStockOutPrice());
            product.setTotalAmount(stock.getStockOutAmount());
            product.setBatchCode(stock.getBatchCode());
            productList.add(product);
        }
        return productList;
    }



    @Override
    public ResponseEntity<String> updateOrderStatus(Integer id) {
        try {
            Optional<Order> optionalOrder =orderRepo.findById(id);
            if(optionalOrder.isPresent()){
                Order order=optionalOrder.get();
                stockRepo.updateStockStatusByTransactionId(order.getTransactionId());
                order.setStatus(false);
                orderRepo.save(order);
                return WASUtils.getResponse("Order delete successfully", HttpStatus.OK);
            }else{
                return WASUtils.getResponse("Unable to delete", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("Error in updateOrderStatus: {}", e.getMessage(), e);
            return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
