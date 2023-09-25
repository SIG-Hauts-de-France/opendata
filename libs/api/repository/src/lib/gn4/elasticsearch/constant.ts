export const ES_SOURCE_SUMMARY = [
  'uuid',
  'id',
  'title',
  'resource*',
  'resourceTitleObject',
  'resourceAbstractObject',
  'overview',
  'logo',
  'codelist_status_text',
  'linkProtocol',
  'contactForResource.organisation',
  'contact.organisation',
  'contact.email',
  'userSavedCount',
  'updateFrequency',
  'cl_topic',
  'cl_maintenanceAndUpdateFrequency',
  'tag',
  'MD_LegalConstraintsUseLimitationObject',
  'qualityScore'
]

export const ES_QUERY_STRING_FIELDS = [
  'resourceTitleObject.${searchLang}^5',
  'tag.${searchLang}^4',
  'resourceAbstractObject.${searchLang}^3',
  'lineageObject.${searchLang}^2',
  'any.${searchLang}',
  'uuid',
]
