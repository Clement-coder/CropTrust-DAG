import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import { cropTrustAbi } from './src/generated'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'CropTrust',
      abi: cropTrustAbi,
    },
  ],
  plugins: [react()],
})
