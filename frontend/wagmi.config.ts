import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import * as abis from './src/lib/abi'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'CropTrust',
      abi: abis.CropTrustABI.abi,
    },
  ],
  plugins: [react()],
})
