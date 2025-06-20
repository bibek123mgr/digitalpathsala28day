import React, { useState } from 'react';
import {
    LayoutDashboard,
    Package,
    Truck,
    Users,
    Settings,
    Bell,
    User,
    Search,
    Warehouse,
    ClipboardList,
    BarChart2,
    Calendar,
    AlertCircle,
    Plus,
    MoreVertical,
    Boxes,
    ClipboardCheck,
    Clock,
    MapPin
} from 'lucide-react';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    // Mock data
    const warehouseZones = [
        { id: 1, name: 'Zone A - Fast Moving', capacity: '85%', items: 320, manager: 'Sarah Johnson' },
        { id: 2, name: 'Zone B - Bulk Storage', capacity: '65%', items: 450, manager: 'Mike Chen' },
        { id: 3, name: 'Zone C - Hazardous', capacity: '45%', items: 120, manager: 'Emma Rodriguez' },
        { id: 4, name: 'Zone D - Perishables', capacity: '72%', items: 210, manager: 'David Kim' },
    ];

    const recentActivities = [
        { id: 1, action: 'New shipment arrived', item: 'Electrical Components', user: 'John Doe', time: '10 mins ago' },
        { id: 2, action: 'Safety inspection', item: 'Zone C', user: 'Jane Smith', time: '25 mins ago' },
        { id: 3, action: 'Inventory audit started', item: 'Zone A', user: 'Mike Johnson', time: '1 hour ago' },
        { id: 4, action: 'Equipment maintenance', item: 'Forklift #3', user: 'System', time: '2 hours ago' },
    ];

    const upcomingShipments = [
        { id: 1, supplier: 'Builders Inc', items: 12, expected: 'Tomorrow', status: 'Processing', destination: 'Construction Site 42' },
        { id: 2, supplier: 'Lumber Co', items: 8, expected: 'Jun 20', status: 'In Transit', destination: 'Woodworks Factory' },
        { id: 3, supplier: 'Electrical Supply', items: 15, expected: 'Jun 22', status: 'Scheduled', destination: 'Main Warehouse' },
    ];

    const pendingTasks = [
        { id: 1, task: 'Quality check for Zone B', priority: 'High', assigned: 'Alex Turner', deadline: 'Today 4 PM' },
        { id: 2, task: 'Update safety protocols', priority: 'Medium', assigned: 'Maria Garcia', deadline: 'Tomorrow' },
        { id: 3, task: 'Schedule equipment maintenance', priority: 'Low', assigned: 'You', deadline: 'Jun 25' },
    ];

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Warehouse Overview</h2>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={<Boxes size={24} className="text-blue-600" />}
                        title="Total Zones"
                        value="8"
                        change="2 zones added this month"
                        bgColor="bg-blue-50"
                    />
                    <StatCard
                        icon={<Warehouse size={24} className="text-green-600" />}
                        title="Total Capacity"
                        value="72%"
                        change="+5% utilization"
                        bgColor="bg-green-50"
                    />
                    <StatCard
                        icon={<Truck size={24} className="text-orange-600" />}
                        title="Weekly Shipments"
                        value="24"
                        change="3 delayed"
                        bgColor="bg-orange-50"
                    />
                    <StatCard
                        icon={<ClipboardCheck size={24} className="text-purple-600" />}
                        title="Pending Tasks"
                        value="15"
                        change="3 high priority"
                        bgColor="bg-purple-50"
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Warehouse Zones */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Warehouse Zones</h3>
                            <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                                <Plus size={16} className="mr-1" />
                                Add Zone
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {warehouseZones.map((zone) => (
                                        <tr key={zone.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{zone.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div
                                                        className={`h-2.5 rounded-full ${parseInt(zone.capacity) > 80 ? 'bg-red-500' :
                                                                parseInt(zone.capacity) > 60 ? 'bg-yellow-500' : 'bg-green-500'
                                                            }`}
                                                        style={{ width: zone.capacity }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs text-gray-500 mt-1">{zone.capacity}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">{zone.items}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">{zone.manager}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Activity and Tasks */}
                    <div className="space-y-6">
                        {/* Recent Activity */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                {recentActivities.map((activity) => (
                                    <div key={activity.id} className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                                                <User size={14} className="text-blue-600" />
                                            </div>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                            <p className="text-xs text-gray-500">by {activity.user} • {activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pending Tasks */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pending Tasks</h3>
                            <div className="space-y-4">
                                {pendingTasks.map((task) => (
                                    <div key={task.id} className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${task.priority === 'High' ? 'bg-red-100' :
                                                    task.priority === 'Medium' ? 'bg-yellow-100' : 'bg-gray-100'
                                                }`}>
                                                <ClipboardList size={14} className={
                                                    task.priority === 'High' ? 'text-red-600' :
                                                        task.priority === 'Medium' ? 'text-yellow-600' : 'text-gray-600'
                                                } />
                                            </div>
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <div className="flex justify-between">
                                                <p className="text-sm font-medium text-gray-900">{task.task}</p>
                                                <span className="text-xs text-gray-500">{task.deadline}</span>
                                            </div>
                                            <p className="text-xs text-gray-500">Assigned to: {task.assigned}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Upcoming Shipments */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Upcoming Shipments</h3>
                            <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                                <Plus size={16} className="mr-1" />
                                Add Shipment
                            </button>
                        </div>
                        <div className="space-y-4">
                            {upcomingShipments.map((shipment) => (
                                <div key={shipment.id} className="border rounded-lg p-4 hover:bg-gray-50">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{shipment.supplier}</p>
                                            <p className="text-xs text-gray-500 mt-1 flex items-center">
                                                <MapPin size={12} className="mr-1" />
                                                {shipment.destination}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full 
                      ${shipment.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                                shipment.status === 'In Transit' ? 'bg-purple-100 text-purple-800' :
                                                    'bg-gray-100 text-gray-800'}`}>
                                            {shipment.status}
                                        </span>
                                    </div>
                                    <div className="mt-2 flex justify-between items-center">
                                        <p className="text-xs text-gray-500 flex items-center">
                                            <Boxes size={12} className="mr-1" />
                                            {shipment.items} items
                                        </p>
                                        <p className="text-xs text-gray-500 flex items-center">
                                            <Clock size={12} className="mr-1" />
                                            Expected: {shipment.expected}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Warehouse Utilization */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Warehouse Utilization</h3>
                            <div className="flex items-center text-sm text-gray-500">
                                <Calendar size={16} className="mr-1" />
                                Last 30 days
                            </div>
                        </div>
                        <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                            <BarChart2 size={48} className="text-gray-300" />
                            <p className="ml-2 text-gray-400">Utilization chart would display here</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Reusable Components
const StatCard = ({ icon, title, value, change, bgColor }) => {
    return (
        <div className={`${bgColor} p-6 rounded-lg shadow-sm`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
                    <p className="text-xs text-gray-500 mt-1">{change}</p>
                </div>
                <div className="p-3 rounded-full bg-white">
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;