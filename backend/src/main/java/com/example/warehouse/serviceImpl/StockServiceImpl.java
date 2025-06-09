package com.example.warehouse.serviceImpl;

import com.example.warehouse.constants.WASConstants;
import com.example.warehouse.dto.AddStockRequestDto;
import com.example.warehouse.dto.StockResponseDto;
import com.example.warehouse.entity.*;
import com.example.warehouse.repo.StockRepo;
import com.example.warehouse.service.StockService;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
public class StockServiceImpl implements StockService {

    @Autowired
    private StockRepo stockRepo;

    @Autowired
    private CommonServices commonServices;

    @Override
    public ResponseEntity<String> addStock(AddStockRequestDto addStockRequestDto) {
        try {
            Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
            UserPrincipal userPrincipal=(UserPrincipal) authentication.getPrincipal();
            Integer userId= userPrincipal.getId();
            Integer transactionId=commonServices.getTransactionId();
            String batchCode= commonServices.generateBatchCode();
            stockRepo.save(mapDataToEntity(addStockRequestDto,userId,transactionId,batchCode));
            commonServices.updateTransactionId(transactionId);
            return ResponseEntity.ok("Stock added successfully.");
        } catch (Exception e) {
            log.error("Error occurred at addStock: {}", e.getMessage(), e);
            return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Stock mapDataToEntity(AddStockRequestDto addStockRequestDto,Integer userId,Integer transactionId,String batchCode) {

        Product product=new Product();
        User user=new User();
        Supplier supplier =new Supplier();

        product.setId(addStockRequestDto.getProductId());
        user.setId(userId);
        supplier.setId(addStockRequestDto.getSupplierId());

        Stock stock = new Stock();
        stock.setStockIn(addStockRequestDto.getStockIn());
        stock.setPerStockInPrice(addStockRequestDto.getPerStockInPrice());
        stock.setStockInAmount(addStockRequestDto.getStockInAmount());
        stock.setProduct(product);
        stock.setCreatedBy(user);
        stock.setSupplier(supplier);
        stock.setBatchCode("PUR-"+addStockRequestDto.getProductId()+batchCode);
        stock.setTransactionId(transactionId);
        stock.setComesFrom("PURCHASE");
        return stock;
    }

    @Override
    public ResponseEntity<String> updateStock(AddStockRequestDto addStockRequestDto, Integer id) {
        try{
            Optional<Stock> optionalStock=stockRepo.findById(id);
            Stock stock=optionalStock.get();
            if(stock == null) {
                return WASUtils.getResponse("No Stock Found", HttpStatus.BAD_REQUEST);
            }else{
                stockRepo.save(mapUpdateDataToEntity(stock,addStockRequestDto));
                return WASUtils.getResponse(WASConstants.DATA_SUCCESSFULLY_UPDATED, HttpStatus.OK);
            }
        } catch (Exception e) {
            log.error("Error occurred at addStock: {}", e.getMessage(), e);
            return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Stock mapUpdateDataToEntity(Stock stock,AddStockRequestDto addStockRequestDto){

        Product product=new Product();
        Supplier supplier =new Supplier();

        product.setId(addStockRequestDto.getProductId());
        supplier.setId(addStockRequestDto.getSupplierId());

        stock.setStockIn(addStockRequestDto.getStockIn());
        stock.setPerStockInPrice(addStockRequestDto.getPerStockInPrice());
        stock.setStockInAmount(addStockRequestDto.getStockInAmount());
        stock.setProduct(product);
        stock.setSupplier(supplier);
        return stock;
    }


    @Override
    public ResponseEntity<String> updateStockStatus(Integer id) {
        try{
            Optional<Stock> optionalStock=stockRepo.findById(id);
            Stock stock=optionalStock.get();
            if(stock == null) {
                return WASUtils.getResponse("No Stock Found", HttpStatus.BAD_REQUEST);
            }else{
                stock.setStatus(false);
                stockRepo.save(stock);
                return WASUtils.getResponse(WASConstants.DATA_SUCCESSFULLY_DELETED, HttpStatus.OK);
            }
        } catch (Exception e) {
            log.error("Error occurred at updateStockStatus: {}", e.getMessage(), e);
            return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<StockResponseDto>> getAllAvailableProductStock() {
        try{
            List<StockResponseDto> stock=stockRepo.getAllAvailableStock();
            return new ResponseEntity<>(stock,HttpStatus.OK);
        }catch (Exception e) {
            log.error("Error occurred at getAllAvailableProductStock: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ArrayList<>() , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<StockResponseDto>> getAllAvailableOfStockParticularProduct(Integer id) {
        try{
            List<StockResponseDto> stock=stockRepo.getAllAvailableStockForProduct(id);
            return new ResponseEntity<>(stock,HttpStatus.OK);
        }catch (Exception e) {
            log.error("Error occurred at getAllAvailableOfStockParticularProduct: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ArrayList<>() , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
