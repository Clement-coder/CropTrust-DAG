// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/CropTrust.sol";
import "../src/mocks/MockERC20.sol";
import "../src/interfaces/ICropTrust.sol";

contract CropTrustTest is Test {
    CropTrust public cropTrust;
    MockERC20 public mockERC20;

    address public deployer;
    address public farmer1;
    address public buyer1;

    function setUp() public {
        deployer = makeAddr("deployer");
        farmer1 = makeAddr("farmer1");
        buyer1 = makeAddr("buyer1");

        vm.startPrank(deployer);
        mockERC20 = new MockERC20();
        cropTrust = new CropTrust(address(mockERC20));
        vm.stopPrank();
    }

    function testListCrop() public {
        vm.startPrank(farmer1);
        cropTrust.listCrop("Apple", "Fresh red apples", 100, 50, "apple.jpg");
        vm.stopPrank();

        (
            uint256 id,
            string memory name,
            string memory description,
            uint256 price,
            uint256 quantity,
            string memory imageUrl,
            address seller,
            bool isListed
        ) = cropTrust.crops(1);
        assertEq(name, "Apple");
        assertEq(price, 100);
        assertEq(quantity, 50);
        assertEq(seller, farmer1);
        assertTrue(isListed);
    }
}
