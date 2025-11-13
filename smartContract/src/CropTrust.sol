// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./interfaces/ICropTrust.sol";

/// @title CropTrust
/// @dev A decentralized marketplace for farmers and consumers to trade crops.
/// @custom:security-contact security@croptrust.com
contract CropTrust is ICropTrust, ReentrancyGuard {
    uint256 private _cropIds;
    uint256 private _orderIds;

    address public owner;
    IERC20 public paymentToken;

    mapping(uint256 => Crop) public crops;
    mapping(uint256 => Order) public orders;
    mapping(address => uint256) public sellerFunds;

    /// @dev Thrown when the price of a crop is zero.
    error PriceMustBeGreaterThanZero();
    /// @dev Thrown when the quantity of a crop is zero.
    error QuantityMustBeGreaterThanZero();
    /// @dev Thrown when a crop is not listed for sale.
    error CropNotListed();
    /// @dev Thrown when the requested quantity exceeds the available quantity.
    error NotEnoughQuantity();
    /// @dev Thrown when the caller has not approved enough tokens for the contract to spend.
    error InsufficientAllowance();
    /// @dev Thrown when an ERC20 token transfer operation fails.
    error TransferFailed();
    /// @dev Thrown when a function can only be called by the buyer of an order.
    error OnlyBuyer();
    /// @dev Thrown when an order is not in the Pending status.
    error OrderNotPending();
    /// @dev Thrown when a seller tries to withdraw funds but their balance is zero.
    error NoFundsToWithdraw();
    /// @dev Thrown when an order cannot be cancelled (e.g., it's already confirmed or cancelled).
    error OrderNotCancellable();
    /// @dev Thrown when a function can only be called by either the buyer or the seller of an order.
    error OnlyBuyerOrSeller();
    /// @dev Thrown when a function can only be called by the seller of a crop.
    error OnlySeller();

    modifier onlyOwner() {
        if (msg.sender != owner) revert();
        _;
    }

    modifier onlySeller(address _seller) {
        if (msg.sender != _seller) revert OnlySeller();
        _;
    }

    /// @dev Initializes the CropTrust contract.
    /// @param _paymentTokenAddress The address of the ERC20 token used for payments.
    constructor(address _paymentTokenAddress) {
        owner = msg.sender;
        paymentToken = IERC20(_paymentTokenAddress);
    }

    /// @notice Allows a farmer to list a new crop for sale.
    /// @param _name The name of the crop.
    /// @param _description A brief description of the crop.
    /// @param _price The price of a single unit of the crop.
    /// @param _quantity The total quantity of the crop available.
    /// @param _imageUrl A URL or IPFS hash pointing to an image of the crop.
    function listCrop(
        string memory _name,
        string memory _description,
        uint256 _price,
        uint256 _quantity,
        string memory _imageUrl
    ) external override nonReentrant onlySeller(msg.sender) {
        if (_price == 0) revert PriceMustBeGreaterThanZero();
        if (_quantity == 0) revert QuantityMustBeGreaterThanZero();

        _cropIds++;
        uint256 newCropId = _cropIds;

        crops[newCropId] = Crop({
            id: newCropId,
            name: _name,
            description: _description,
            price: _price,
            quantity: _quantity,
            imageUrl: _imageUrl,
            seller: msg.sender,
            isListed: true
        });

        emit CropListed(newCropId, _name, _price, _quantity, msg.sender);
    }

    /// @notice Allows a consumer to purchase a specified quantity of a listed crop.
    /// @param _cropId The ID of the crop to purchase.
    /// @param _quantity The quantity of the crop to purchase.
    function purchaseCrop(uint256 _cropId, uint256 _quantity)
        external
        override
        nonReentrant
    {
        Crop storage crop = crops[_cropId];
        if (!crop.isListed) revert CropNotListed();
        if (crop.quantity < _quantity) revert NotEnoughQuantity();

        uint256 totalPrice = crop.price * _quantity;
        if (paymentToken.allowance(msg.sender, address(this)) < totalPrice) {
            revert InsufficientAllowance();
        }

        bool success = paymentToken.transferFrom(
            msg.sender,
            address(this),
            totalPrice
        );
        if (!success) revert TransferFailed();

        _orderIds++;
        uint256 newOrderId = _orderIds;

        orders[newOrderId] = Order({
            id: newOrderId,
            cropId: _cropId,
            quantity: _quantity,
            totalPrice: totalPrice,
            buyer: msg.sender,
            seller: crop.seller,
            status: Status.Pending
        });

        crop.quantity -= _quantity;
        if (crop.quantity == 0) {
            crop.isListed = false;
        }

        emit CropPurchased(newOrderId, _cropId, _quantity, totalPrice, msg.sender);
    }

    /// @notice Allows the buyer to confirm an order, releasing funds to the seller's withdrawable balance.
    /// @param _orderId The ID of the order to confirm.
    function confirmOrder(uint256 _orderId) external override nonReentrant {
        Order storage order = orders[_orderId];
        if (order.buyer != msg.sender) revert OnlyBuyer();
        if (order.status != Status.Pending) revert OrderNotPending();

        order.status = Status.Confirmed;
        sellerFunds[order.seller] += order.totalPrice;

        emit OrderConfirmed(_orderId, order.seller, order.totalPrice);
    }

    /// @notice Allows a seller to withdraw their accumulated funds from confirmed orders.
    function withdrawFunds() external nonReentrant {
        uint256 amount = sellerFunds[msg.sender];
        if (amount == 0) revert NoFundsToWithdraw();

        sellerFunds[msg.sender] = 0;
        bool success = paymentToken.transfer(msg.sender, amount);
        if (!success) revert TransferFailed();

        emit FundsWithdrawn(msg.sender, amount);
    }

    /// @notice Allows either the buyer or seller to cancel a pending order.
    /// @param _orderId The ID of the order to cancel.
    function cancelOrder(uint256 _orderId) external override nonReentrant {
        Order storage order = orders[_orderId];
        if (order.status != Status.Pending) revert OrderNotCancellable();
        if (msg.sender != order.buyer && msg.sender != order.seller) revert OnlyBuyerOrSeller();

        order.status = Status.Cancelled;
        crops[order.cropId].quantity += order.quantity; // Restore crop quantity

        bool success = paymentToken.transfer(order.buyer, order.totalPrice);
        if (!success) revert TransferFailed();

        emit OrderCancelled(_orderId, msg.sender);
    }

    /// @notice Retrieves the details of a specific crop.
    /// @param _cropId The ID of the crop to retrieve.
    /// @return Crop memory The crop details.
    function getCrop(uint256 _cropId)
        external
        view
        override
        returns (Crop memory)
    {
        return crops[_cropId];
    }

    /// @notice Retrieves the details of a specific order.
    /// @param _orderId The ID of the order to retrieve.
    /// @return Order memory The order details.
    function getOrder(uint256 _orderId)
        external
        view
        override
        returns (Order memory)
    {
        return orders[_orderId];
    }

    /// @notice Returns the total number of crops listed.
    /// @return The total number of crops.
    function totalCrops() external view returns (uint256) {
        return _cropIds;
    }

}