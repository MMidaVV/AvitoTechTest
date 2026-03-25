import type { Category, ItemParams } from '../../types/api'

export interface DetailsProps {
  category?: Category
  params?: ItemParams
  needsRevision?: boolean
}