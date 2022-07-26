import { NetworkIcon } from '@losslessproject/react-components'
import React, { useState } from 'react'

import classNames from 'classnames'
import { Chain, useConnect } from 'wagmi'
import { useWalletChainId } from '../hooks/useWalletChainId'
import { NetworkSelectionModal } from './NetworkSelectionModal'
import { i18nTranslate } from '../interfaces'
import { getChainNameByChainId } from '../utilities/getChainNameByChainId'
import { getChainColorByChainId } from '../utilities/getChainColorByChainId'

export interface NetworkSelectionProps {
  chains: Chain[]
  className?: string
  t?: i18nTranslate
}

export const NetworkSelectionButton: React.FC<NetworkSelectionProps> = (props) => {
  const { chains, className, t } = props
  const { activeConnector } = useConnect()
  const chainId = useWalletChainId()
  const [isOpen, setIsOpen] = useState(false)

  if (!activeConnector) return null

  return (
    <>
      <button
        className={classNames(className, 'flex space-x-2 items-center ')}
        onClick={() => setIsOpen(true)}
      >
        <NetworkIcon chainId={chainId} />
        <span
          className={`hidden xs:block font-bold hover:opacity-70 transition`}
          style={{ color: getChainColorByChainId(chainId) }}
        >
          {getChainNameByChainId(chainId)}
        </span>
      </button>
      <NetworkSelectionModal
        closeModal={() => setIsOpen(false)}
        isOpen={isOpen}
        chains={chains}
        t={t}
      />
    </>
  )
}
