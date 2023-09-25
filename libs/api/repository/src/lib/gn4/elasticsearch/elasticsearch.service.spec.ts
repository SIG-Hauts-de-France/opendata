import { ElasticsearchService } from './elasticsearch.service'
import { ES_FIXTURE_AGGS_RESPONSE } from '@geonetwork-ui/common/fixtures'
import { EsSearchParams } from '../types/elasticsearch.model'

describe('ElasticsearchService', () => {
  let service: ElasticsearchService
  let searchFilters

  beforeEach(() => {
    service = new ElasticsearchService('fre')
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#Sort', () => {
    it('One sort and default direction', () => {
      const sort = service['buildPayloadSort'](['asc', '_score'])
      expect(sort).toEqual([{ _score: 'asc' }])
    })

    it('One sort and DESC direction', () => {
      const sort = service['buildPayloadSort'](['desc', 'changeDate'])
      expect(sort).toEqual([{ changeDate: 'desc' }])
    })

    it('Multiple sorts', () => {
      const sort = service['buildPayloadSort']([
        ['asc', '_score'],
        ['desc', 'changeDate'],
      ])
      expect(sort).toEqual([{ _score: 'asc' }, { changeDate: 'desc' }])
    })
  })
  describe('#stateFiltersToQueryString', () => {
    describe('when simple terms', () => {
      beforeEach(() => {
        searchFilters = {
          'tag.default': {
            world: true,
            vector: true,
          },
        }
      })
      it('return OR separated query', () => {
        const query = service.stateFiltersToQueryString(searchFilters)
        expect(query).toBe('(tag.default:"world" tag.default:"vector")')
      })
    })

    describe('when recursive terms', () => {
      beforeEach(() => {
        searchFilters = {
          resourceType: {
            service: {
              serviceType: {
                'OGC:WMS': true,
              },
            },
            dataset: true,
          },
        }
      })
      it('nest sub key with AND operator', () => {
        const query = service.stateFiltersToQueryString(searchFilters)
        expect(query).toBe(
          '((resourceType:"service" AND (serviceType:"OGC:WMS")) resourceType:"dataset")'
        )
      })
    })
  })

  describe('#getSearchRequestBody', () => {
    describe('#track_total_hits', () => {
      let size = 0
      let payload
      describe('when size is 0', () => {
        beforeEach(() => {
          payload = service.getSearchRequestBody({}, size)
        })
        it('request body does not contain track_total_hits', () => {
          expect(payload).not.toHaveProperty('track_total_hits')
        })
      })
      describe('when size is not 0', () => {
        beforeEach(() => {
          size = 10
          payload = service.getSearchRequestBody({}, size)
        })
        it('request body contains track_total_hits', () => {
          expect(payload).toHaveProperty('track_total_hits')
          expect(payload.track_total_hits).toBe(true)
        })
      })
    })
  })
  describe('#buildPayloadQuery', () => {
    it('add any and other fields query_strings', () => {
      const query = service['buildPayloadQuery'](
        {
          Org: {
            world: true,
          },
          any: 'hello',
        },
        {}
      )
      expect(query).toEqual({
        bool: {
          filter: [],
          should: [],
          must: [
            {
              terms: {
                isTemplate: ['n'],
              },
            },
            {
              query_string: {
                default_operator: 'AND',
                fields: [
                  'resourceTitleObject.langfre^5',
                  'tag.langfre^4',
                  'resourceAbstractObject.langfre^3',
                  'lineageObject.langfre^2',
                  'any.langfre',
                  'uuid',
                ],
                query: 'hello',
              },
            },
            {
              query_string: {
                query: '(Org:"world")',
              },
            },
          ],
          must_not: {
            terms: {
              resourceType: ['service', 'map', 'map/static', 'mapDigital'],
            },
          },
        },
      })
    })
    it('add any and other fields query_strings and limit search payload by ids', () => {
      const query = service['buildPayloadQuery'](
        {
          Org: {
            world: true,
          },
          any: 'hello',
        },
        {},
        ['record-1', 'record-2', 'record-3']
      )
      expect(query).toEqual({
        bool: {
          filter: [],
          should: [],
          must: [
            {
              terms: {
                isTemplate: ['n'],
              },
            },
            {
              query_string: {
                default_operator: 'AND',
                fields: [
                  'resourceTitleObject.langfre^5',
                  'tag.langfre^4',
                  'resourceAbstractObject.langfre^3',
                  'lineageObject.langfre^2',
                  'any.langfre',
                  'uuid',
                ],
                query: 'hello',
              },
            },
            {
              query_string: {
                query: '(Org:"world")',
              },
            },
            {
              ids: {
                values: ['record-1', 'record-2', 'record-3'],
              },
            },
          ],
          must_not: {
            terms: {
              resourceType: ['service', 'map', 'map/static', 'mapDigital'],
            },
          },
        },
      })
    })
    it('add any and other fields query_strings and limit search payload by ids (also if id array is empty)', () => {
      const query = service['buildPayloadQuery'](
        {
          Org: {
            world: true,
          },
          any: 'hello',
        },
        {},
        []
      )
      expect(query).toEqual({
        bool: {
          filter: [],
          should: [],
          must: [
            {
              terms: {
                isTemplate: ['n'],
              },
            },
            {
              query_string: {
                default_operator: 'AND',
                fields: [
                  'resourceTitleObject.langfre^5',
                  'tag.langfre^4',
                  'resourceAbstractObject.langfre^3',
                  'lineageObject.langfre^2',
                  'any.langfre',
                  'uuid',
                ],
                query: 'hello',
              },
            },
            {
              query_string: {
                query: '(Org:"world")',
              },
            },
            {
              ids: {
                values: [],
              },
            },
          ],
          must_not: {
            terms: {
              resourceType: ['service', 'map', 'map/static', 'mapDigital'],
            },
          },
        },
      })
    })
    describe('any has special characters', () => {
      let query
      beforeEach(() => {
        const any = 'scot (){?[ / test'
        query = service['buildPayloadQuery'](
          {
            any,
          },
          {}
        )
      })
      it('escapes special char', () => {
        expect(query.bool.must[1].query_string.query).toEqual(
          `scot \\(\\)\\{\\?\\[ \\/ test`
        )
      })
    })
    describe('specify an input polygon geometry', () => {
      let geojsonPolygon
      beforeEach(() => {
        geojsonPolygon = {
          coordinates: [
            [
              [3.017921158755172, 50.65759907920972],
              [3.017921158755172, 50.613483610573155],
              [3.1098886148436122, 50.613483610573155],
              [3.017921158755172, 50.65759907920972],
            ],
          ],
          type: 'Polygon',
        }
      })
      it('adds boosting of 7 for intersecting with it and boosting of 10 on geoms within', () => {
        const query = service['buildPayloadQuery'](
          {
            Org: {
              world: true,
            },
            any: 'hello',
          },
          {},
          undefined,
          geojsonPolygon
        )
        expect(query).toEqual({
          bool: {
            filter: [],
            must: [
              {
                terms: {
                  isTemplate: ['n'],
                },
              },
              {
                query_string: {
                  default_operator: 'AND',
                  fields: [
                    'resourceTitleObject.langfre^5',
                    'tag.langfre^4',
                    'resourceAbstractObject.langfre^3',
                    'lineageObject.langfre^2',
                    'any.langfre',
                    'uuid',
                  ],
                  query: 'hello',
                },
              },
              {
                query_string: {
                  query: '(Org:"world")',
                },
              },
            ],
            must_not: {
              terms: {
                resourceType: ['service', 'map', 'map/static', 'mapDigital'],
              },
            },
            should: [
              {
                geo_shape: {
                  geom: {
                    shape: geojsonPolygon,
                    relation: 'within',
                  },
                  boost: 10.0,
                },
              },
              {
                geo_shape: {
                  geom: {
                    shape: geojsonPolygon,
                    relation: 'intersects',
                  },
                  boost: 7.0,
                },
              },
            ],
          },
        })
      })
    })
  })

  describe('#buildAutocompletePayload', () => {
    describe('given an autocomplete config', () => {
      it('returns the search payload', () => {
        const payload = service.buildAutocompletePayload('blarg')
        expect(payload).toEqual({
          _source: ['resourceTitleObject', 'uuid'],
          query: {
            bool: {
              must: [
                {
                  terms: {
                    isTemplate: ['n'],
                  },
                },
                {
                  multi_match: {
                    fields: [
                      'resourceTitleObject.langfre',
                      'resourceAbstractObject.langfre',
                      'tag',
                      'resourceIdentifier',
                    ],
                    query: 'blarg',
                    type: 'bool_prefix',
                  },
                },
              ],
              must_not: {
                terms: {
                  resourceType: ['service', 'map', 'map/static', 'mapDigital'],
                },
              },
            },
          },
          from: 0,
          size: 20,
        })
      })
    })
  })

  describe('#getMetadataByIdPayload', () => {
    let uuid, payload
    beforeEach(() => {
      uuid = '132132132132321'
      payload = service.getMetadataByIdPayload(uuid)
    })
    it('returns ES payload', () => {
      expect(payload).toEqual({
        query: {
          ids: {
            values: [uuid],
          },
        },
      })
    })
  })

  describe('#getRelatedRecordPayload', () => {
    let payload
    beforeEach(() => {
      payload = service.getRelatedRecordPayload('record title', 'some-uuid', 4)
    })
    it('returns ES payload', () => {
      expect(payload).toEqual({
        _source: [
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
          "updateFrequency",
          "cl_topic",
          "cl_maintenanceAndUpdateFrequency",
          "tag",
          "MD_LegalConstraintsUseLimitationObject",
          "qualityScore",
        ],
        query: {
          bool: {
            must: [
              {
                more_like_this: {
                  fields: [
                    'resourceTitleObject.default',
                    'resourceAbstractObject.default',
                    'tag.raw',
                  ],
                  like: 'record title',
                  max_query_terms: 12,
                  min_term_freq: 1,
                },
              },
              {
                terms: {
                  isTemplate: ['n'],
                },
              },
              {
                terms: {
                  draft: ['n', 'e'],
                },
              },
            ],
            must_not: [{ wildcard: { uuid: 'some-uuid' } }],
          },
        },
        size: 4,
      })
    })
  })

  describe('#queryFilterOnValues', () => {
    let payload
    it('when array of templates', () => {
      payload = service.queryFilterOnValues('isTemplate', ['n', 's'])
      expect(payload).toEqual({
        terms: {
          isTemplate: ['n', 's'],
        },
      })
    })
    it('when single template', () => {
      payload = service.queryFilterOnValues('isTemplate', 'n')
      expect(payload).toEqual({
        terms: {
          isTemplate: ['n'],
        },
      })
    })
    it('when undefined', () => {
      payload = service.queryFilterOnValues('isTemplate', undefined)
      expect(payload).toEqual({})
    })
    it('when empty array', () => {
      payload = service.queryFilterOnValues('isTemplate', [])
      expect(payload).toEqual({})
    })
  })

  describe('#registerRuntimeField', () => {
    let query: EsSearchParams
    beforeEach(() => {
      service.registerRuntimeField('myField', 'emit("hello world!")')
    })
    describe('when a runtime field is used in an aggregation', () => {
      beforeEach(() => {
        query = service.getSearchRequestBody({
          anAggregation: {
            type: 'terms',
            limit: 100,
            field: 'myField',
            sort: ['asc', 'count'],
          },
        })
      })
      it('includes the field as a runtime mapping', () => {
        expect(query.runtime_mappings).toEqual({
          myField: {
            script: 'emit("hello world!")',
            type: 'keyword',
          },
        })
      })
    })
    describe('when a runtime field is used in a query string', () => {
      beforeEach(() => {
        query = service.getSearchRequestBody(
          undefined,
          10,
          0,
          null,
          undefined,
          {
            any: 'hello',
            myField: { check: true },
          }
        )
      })
      it('includes the field as a runtime mapping', () => {
        expect(query.runtime_mappings).toEqual({
          myField: {
            script: 'emit("hello world!")',
            type: 'keyword',
          },
        })
      })
    })
    describe('when a runtime field is used for sorting', () => {
      beforeEach(() => {
        query = service.getSearchRequestBody(undefined, 10, 0, [
          'asc',
          'myField',
        ])
      })
      it('includes the field as a runtime mapping', () => {
        expect(query.runtime_mappings).toEqual({
          myField: {
            script: 'emit("hello world!")',
            type: 'keyword',
          },
        })
      })
    })
    describe('when a runtime field is not used', () => {
      beforeEach(() => {
        query = service.getSearchRequestBody(
          {
            otherAgg: {
              type: 'terms',
              limit: 100,
              field: 'otherField',
              sort: ['desc', 'key'],
            },
            myField: {
              type: 'terms',
              limit: 10,
              field: 'notARuntimeField',
              sort: ['desc', 'key'],
            },
          },
          10,
          0,
          null,
          undefined,
          {
            any: 'hello',
            otherField: 'check',
          }
        )
      })
      it('does not include the field in the query', () => {
        expect(query.runtime_mappings).toBeUndefined()
      })
    })
  })

  describe('#buildAggregationsPayload', () => {
    it('transforms to ES syntax', () => {
      expect(
        service.buildAggregationsPayload({
          myTerm: {
            type: 'terms',
            sort: ['asc', 'key'],
            field: 'field2',
            limit: 30,
            filter: 'field1 < 100',
          },
          myFilters: {
            type: 'filters',
            filters: {
              filter1: { field1: '100' },
              filter2: { field2: { value1: true, value3: true } },
            },
          },
          myHistogram: {
            type: 'histogram',
            field: 'field3',
            interval: 100,
          },
        })
      ).toStrictEqual({
        myFilters: {
          filters: {
            filter1: {
              match: {
                field1: '100',
              },
            },
            filter2: {
              match: {
                field2: { value1: true, value3: true },
              },
            },
          },
        },
        myHistogram: {
          histogram: {
            field: 'field3',
            interval: 100,
          },
        },
        myTerm: {
          terms: {
            field: 'field2',
            order: {
              _key: 'asc',
            },
            size: 30,
          },
        },
      })
    })
  })

  describe('#parseAggregationResult', () => {
    describe('terms aggregation', () => {
      it('parses the result', () => {
        expect(
          service.parseAggregationResult(
            ES_FIXTURE_AGGS_RESPONSE['tag.default'],
            { type: 'terms' } as any
          )
        ).toStrictEqual({
          buckets: [
            {
              count: 20,
              term: 'Hungary',
            },
            {
              count: 3,
              term: 'Austria',
            },
            {
              count: 8,
              term: 'Belgium',
            },
            {
              count: 2,
              term: 'Bulgaria',
            },
            {
              count: 15,
              term: 'Croatia',
            },
            {
              count: 5,
              term: 'Cyprus',
            },
          ],
        })
      })
    })
    describe('filters aggregation', () => {
      it('parses the result', () => {
        expect(
          service.parseAggregationResult(
            ES_FIXTURE_AGGS_RESPONSE['availableInServices'],
            { type: 'filters' } as any
          )
        ).toStrictEqual({
          buckets: [
            {
              count: 0,
              term: 'availableInDownloadService',
            },
            {
              count: 299,
              term: 'availableInViewService',
            },
          ],
        })
      })
    })
    describe('histogram aggregation', () => {
      const expectedHistogram = {
        buckets: [
          {
            count: 2,
            highValue: 10000,
            lowValue: 0,
          },
          {
            count: 291,
            highValue: 20000,
            lowValue: 10000,
          },
          {
            count: 1,
            highValue: 50000,
            lowValue: 20000,
          },
          {
            count: 9,
            highValue: 100000,
            lowValue: 50000,
          },
          {
            count: 135,
            highValue: 250000,
            lowValue: 100000,
          },
          {
            count: 54,
            highValue: 1000000,
            lowValue: 250000,
          },
          {
            count: 55,
            highValue: 2000000,
            lowValue: 1000000,
          },
          {
            count: 3,
            highValue: 3000000,
            lowValue: 2000000,
          },
          {
            count: 10,
            highValue: 10000000,
            lowValue: 3000000,
          },
          {
            count: 93,
            highValue: 20000000,
            lowValue: 10000000,
          },
          {
            count: 9,
            highValue: 60000000,
            lowValue: 20000000,
          },
        ],
      }
      it('parses the result (keyed)', () => {
        expect(
          service.parseAggregationResult(
            ES_FIXTURE_AGGS_RESPONSE['resolutionScaleDenominator'],
            { type: 'histogram' } as any
          )
        ).toStrictEqual(expectedHistogram)
      })
      it('parses the result (ordered array)', () => {
        expect(
          service.parseAggregationResult(
            ES_FIXTURE_AGGS_RESPONSE['resolutionScaleDenominatorArray'],
            { type: 'histogram' } as any
          )
        ).toStrictEqual(expectedHistogram)
      })
    })
  })
})
