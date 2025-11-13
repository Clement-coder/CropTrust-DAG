// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ICropTrust {
    struct Crop {
        uint256 id;
        string name;
        string description;
        uint256 price;
        uint256 quantity;
        string imageUrl;
        address seller;
        bool isListed;
    }

    struct Order {
        uint256 id;
        uint256 cropId;
        uint256 quantity;
        uint256 totalPrice;
        address buyer;
        address seller;
        Status status;
    }

    enum Status {
        Pending,
        Delivered,
        Confirmed,
        Cancelled
    }

    /// @dev Emitted when a new crop is listed for sale.
    /// @param id The unique ID of the crop.
    /// @param name The name of the crop.
    /// @param price The price of the crop.
    /// @param quantity The quantity of the crop.
    /// @param seller The address of the seller.
    event CropListed(
        uint256 id,
        string name,
        uint256 price,
        uint256 quantity,
        address indexed seller
    );

    /// @dev Emitted when a crop is successfully purchased.
    /// @param orderId The unique ID of the order.
    /// @param cropId The ID of the purchased crop.
    /// @param quantity The quantity purchased.
    /// @param totalPrice The total price of the purchase.
    /// @param buyer The address of the buyer.
    event CropPurchased(
        uint256 orderId,
        uint256 cropId,
        uint256 quantity,
        uint256 totalPrice,
        address indexed buyer
    );

    /// @dev Emitted when an order is confirmed by the buyer.
    /// @param orderId The unique ID of the confirmed order.
    /// @param seller The address of the seller.
    /// @param amount The amount transferred to the seller's withdrawable balance.
    event OrderConfirmed(uint256 orderId, address indexed seller, uint256 amount);
    /// @dev Emitted when a seller withdraws their funds.
    /// @param recipient The address that received the funds.
    /// @param amount The amount of funds withdrawn.
    event FundsWithdrawn(address indexed recipient, uint256 amount);
    /// @dev Emitted when an order is cancelled.
    /// @param orderId The unique ID of the cancelled order.
    /// @param canceller The address that cancelled the order (buyer or seller).
    event OrderCancelled(uint256 orderId, address indexed canceller);

    function listCrop(
        string memory _name,
        string memory _description,
        uint256 _price,
        uint256 _quantity,
        string memory _imageUrl
    ) external;

    function purchaseCrop(uint256 _cropId, uint256 _quantity) external;

    function confirmOrder(uint256 _orderId) external;
    
    function withdrawFunds() external;

    function cancelOrder(uint256 _orderId) external;

    function getCrop(uint256 _cropId) external view returns (Crop memory);

    function getOrder(uint256 _orderId) external view returns (Order memory);

    function totalCrops() external view returns (uint256);
}
