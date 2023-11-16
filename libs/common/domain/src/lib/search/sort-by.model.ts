import { SortByField } from './search.model'

export const SortByEnum: Record<string, SortByField> = {
  CREATE_DATE: ['desc', 'createDate'],
  CREATE_DATE_ASC: ['asc', 'createDate'],
  CHANGE_DATE: ['desc', 'changeDate'],
  POPULARITY: ['desc', 'userSavedCount'],
  RELEVANCY: ['desc', '_score'],
  QUALITY_SCORE: ['desc', 'qualityScore'],
}
