import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CropTrust
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const cropTrustAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_paymentTokenAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_orderId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelOrder',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_orderId', internalType: 'uint256', type: 'uint256' }],
    name: 'confirmOrder',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'crops',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'price', internalType: 'uint256', type: 'uint256' },
      { name: 'quantity', internalType: 'uint256', type: 'uint256' },
      { name: 'imageUrl', internalType: 'string', type: 'string' },
      { name: 'seller', internalType: 'address', type: 'address' },
      { name: 'isListed', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_cropId', internalType: 'uint256', type: 'uint256' }],
    name: 'getCrop',
    outputs: [
      {
        name: '',
        internalType: 'struct ICropTrust.Crop',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'price', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          { name: 'imageUrl', internalType: 'string', type: 'string' },
          { name: 'seller', internalType: 'address', type: 'address' },
          { name: 'isListed', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_orderId', internalType: 'uint256', type: 'uint256' }],
    name: 'getOrder',
    outputs: [
      {
        name: '',
        internalType: 'struct ICropTrust.Order',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'cropId', internalType: 'uint256', type: 'uint256' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          { name: 'totalPrice', internalType: 'uint256', type: 'uint256' },
          { name: 'buyer', internalType: 'address', type: 'address' },
          { name: 'seller', internalType: 'address', type: 'address' },
          {
            name: 'status',
            internalType: 'enum ICropTrust.Status',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_description', internalType: 'string', type: 'string' },
      { name: '_price', internalType: 'uint256', type: 'uint256' },
      { name: '_quantity', internalType: 'uint256', type: 'uint256' },
      { name: '_imageUrl', internalType: 'string', type: 'string' },
    ],
    name: 'listCrop',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'orders',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'cropId', internalType: 'uint256', type: 'uint256' },
      { name: 'quantity', internalType: 'uint256', type: 'uint256' },
      { name: 'totalPrice', internalType: 'uint256', type: 'uint256' },
      { name: 'buyer', internalType: 'address', type: 'address' },
      { name: 'seller', internalType: 'address', type: 'address' },
      { name: 'status', internalType: 'enum ICropTrust.Status', type: 'uint8' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paymentToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_cropId', internalType: 'uint256', type: 'uint256' },
      { name: '_quantity', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'purchaseCrop',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'sellerFunds',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalCrops',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawFunds',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'name', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'price',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'quantity',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'seller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'CropListed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'orderId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'cropId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'quantity',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'totalPrice',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'buyer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'CropPurchased',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'FundsWithdrawn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'orderId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'canceller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OrderCancelled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'orderId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'seller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'OrderConfirmed',
  },
  { type: 'error', inputs: [], name: 'CropNotListed' },
  { type: 'error', inputs: [], name: 'InsufficientAllowance' },
  { type: 'error', inputs: [], name: 'NoFundsToWithdraw' },
  { type: 'error', inputs: [], name: 'NotEnoughQuantity' },
  { type: 'error', inputs: [], name: 'OnlyBuyer' },
  { type: 'error', inputs: [], name: 'OnlyBuyerOrSeller' },
  { type: 'error', inputs: [], name: 'OnlySeller' },
  { type: 'error', inputs: [], name: 'OrderNotCancellable' },
  { type: 'error', inputs: [], name: 'OrderNotPending' },
  { type: 'error', inputs: [], name: 'PriceMustBeGreaterThanZero' },
  { type: 'error', inputs: [], name: 'QuantityMustBeGreaterThanZero' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  { type: 'error', inputs: [], name: 'TransferFailed' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cropTrustAbi}__
 */
export const useReadCropTrust = /*#__PURE__*/ createUseReadContract({
  abi: cropTrustAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cropTrustAbi}__ and `functionName` set to `"crops"`
 */
export const useReadCropTrustCrops = /*#__PURE__*/ createUseReadContract({
  abi: cropTrustAbi,
  functionName: 'crops',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cropTrustAbi}__ and `functionName` set to `"getCrop"`
 */
export const useReadCropTrustGetCrop = /*#__PURE__*/ createUseReadContract({
  abi: cropTrustAbi,
  functionName: 'getCrop',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cropTrustAbi}__ and `functionName` set to `"getOrder"`
 */
export const useReadCropTrustGetOrder = /*#__PURE__*/ createUseReadContract({
  abi: cropTrustAbi,
  functionName: 'getOrder',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cropTrustAbi}__ and `functionName` set to `"orders"`
 */
export const useReadCropTrustOrders = /*#__PURE__*/ createUseReadContract({
  abi: cropTrustAbi,
  functionName: 'orders',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cropTrustAbi}__ and `functionName` set to `"owner"`
 */
export const useReadCropTrustOwner = /*#__PURE__*/ createUseReadContract({
  abi: cropTrustAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cropTrustAbi}__ and `functionName` set to `"paymentToken"`
 */
export const useReadCropTrustPaymentToken = /*#__PURE__*/ createUseReadContract(
  { abi: cropTrustAbi, functionName: 'paymentToken' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cropTrustAbi}__ and `functionName` set to `"sellerFunds"`
 */
export const useReadCropTrustSellerFunds = /*#__PURE__*/ createUseReadContract({
  abi: cropTrustAbi,
  functionName: 'sellerFunds',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cropTrustAbi}__ and `functionName` set to `"totalCrops"`
 */
export const useReadCropTrustTotalCrops = /*#__PURE__*/ createUseReadContract({
  abi: cropTrustAbi,
  functionName: 'totalCrops',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cropTrustAbi}__
 */
export const useWriteCropTrust = /*#__PURE__*/ createUseWriteContract({
  abi: cropTrustAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cropTrustAbi}__ and `functionName` set to `"cancelOrder"`
 */
export const useWriteCropTrustCancelOrder =
  /*#__PURE__*/ createUseWriteContract({
    abi: cropTrustAbi,
    functionName: 'cancelOrder',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cropTrustAbi}__ and `functionName` set to `"confirmOrder"`
 */
export const useWriteCropTrustConfirmOrder =
  /*#__PURE__*/ createUseWriteContract({
    abi: cropTrustAbi,
    functionName: 'confirmOrder',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cropTrustAbi}__ and `functionName` set to `"listCrop"`
 */
export const useWriteCropTrustListCrop = /*#__PURE__*/ createUseWriteContract({
  abi: cropTrustAbi,
  functionName: 'listCrop',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cropTrustAbi}__ and `functionName` set to `"purchaseCrop"`
 */
export const useWriteCropTrustPurchaseCrop =
  /*#__PURE__*/ createUseWriteContract({
    abi: cropTrustAbi,
    functionName: 'purchaseCrop',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cropTrustAbi}__ and `functionName` set to `"withdrawFunds"`
 */
export const useWriteCropTrustWithdrawFunds =
  /*#__PURE__*/ createUseWriteContract({
    abi: cropTrustAbi,
    functionName: 'withdrawFunds',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cropTrustAbi}__
 */
export const useSimulateCropTrust = /*#__PURE__*/ createUseSimulateContract({
  abi: cropTrustAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cropTrustAbi}__ and `functionName` set to `"cancelOrder"`
 */
export const useSimulateCropTrustCancelOrder =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cropTrustAbi,
    functionName: 'cancelOrder',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cropTrustAbi}__ and `functionName` set to `"confirmOrder"`
 */
export const useSimulateCropTrustConfirmOrder =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cropTrustAbi,
    functionName: 'confirmOrder',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cropTrustAbi}__ and `functionName` set to `"listCrop"`
 */
export const useSimulateCropTrustListCrop =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cropTrustAbi,
    functionName: 'listCrop',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cropTrustAbi}__ and `functionName` set to `"purchaseCrop"`
 */
export const useSimulateCropTrustPurchaseCrop =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cropTrustAbi,
    functionName: 'purchaseCrop',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cropTrustAbi}__ and `functionName` set to `"withdrawFunds"`
 */
export const useSimulateCropTrustWithdrawFunds =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cropTrustAbi,
    functionName: 'withdrawFunds',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cropTrustAbi}__
 */
export const useWatchCropTrustEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: cropTrustAbi },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cropTrustAbi}__ and `eventName` set to `"CropListed"`
 */
export const useWatchCropTrustCropListedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cropTrustAbi,
    eventName: 'CropListed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cropTrustAbi}__ and `eventName` set to `"CropPurchased"`
 */
export const useWatchCropTrustCropPurchasedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cropTrustAbi,
    eventName: 'CropPurchased',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cropTrustAbi}__ and `eventName` set to `"FundsWithdrawn"`
 */
export const useWatchCropTrustFundsWithdrawnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cropTrustAbi,
    eventName: 'FundsWithdrawn',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cropTrustAbi}__ and `eventName` set to `"OrderCancelled"`
 */
export const useWatchCropTrustOrderCancelledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cropTrustAbi,
    eventName: 'OrderCancelled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cropTrustAbi}__ and `eventName` set to `"OrderConfirmed"`
 */
export const useWatchCropTrustOrderConfirmedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cropTrustAbi,
    eventName: 'OrderConfirmed',
  })
