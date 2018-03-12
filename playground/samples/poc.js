module.exports = {
  schema: {
    title: "Add Rule Bucket",
    type: "object",
    properties: {
      preset: {
        type: "string",
        enum: ["Feed", "Video"],
        default: "Video",
      },
      isActive: {
        title: "Enable Rule Bucket After Creation",
        type: "boolean",
      },
    },
    dependencies: {
      preset: {
        oneOf: [
          {
            properties: {
              preset: {
                enum: ["Feed"],
              },
              "rule bucket order": {
                type: "number",
                default: 1000,
              },
              "desktop placement name": {
                // 'type': 'string'
                type: "object",
                required: ["title"],
                properties: {
                  title: {
                    type: "string",
                    title: "Title",
                    default: "A new task",
                  },
                  done: {
                    type: "boolean",
                    title: "Done?",
                    default: false,
                  },
                },
              },
              "mobile placement name": {
                type: "string",
              },
              package: {
                type: "string",
                enum: ["Monetization", "Engagement", "More Monetization"],
                default: "Monetization",
              },
            },
          },
          {
            properties: {
              preset: {
                enum: ["Video"],
              },
              "rule bucket order": {
                type: "number",
                default: 200,
              },
              placement: {
                type: "string",
              },
              "unit type": {
                type: "string",
                enum: ["integrated widget", "slider"],
                default: "integrated widget",
              },
              "page type": {
                type: "string",
                enum: [
                  "text",
                  "video",
                  "photo",
                  "homepage",
                  "search",
                  "other",
                  "category",
                ],
                default: "video",
              },
            },
            dependencies: {
              "unit type": {
                oneOf: [
                  {
                    properties: {
                      "unit type": {
                        enum: ["slider"],
                      },
                      tagId: {
                        type: "string",
                        default: "123",
                      },
                    },
                  },
                  {
                    properties: {
                      "unit type": {
                        enum: ["integrated widget"],
                      },
                      slot: {
                        type: "string",
                        enum: [
                          "text",
                          "video",
                          "photo",
                          "homepage",
                          "search",
                          "other",
                          "category",
                        ],
                        default: "other",
                      },
                      tagId: {
                        type: "string",
                        default: "1234",
                      },
                    },
                    dependencies: {
                      slot: {
                        oneOf: [
                          {
                            properties: {
                              slot: {
                                enum: ["text"],
                              },
                              test: {
                                type: "string",
                              },
                            },
                          },
                          {
                            properties: {
                              slot: {
                                enum: [
                                  "video",
                                  "photo",
                                  "homepage",
                                  "search",
                                  "other",
                                  "category",
                                ],
                              },
                              iWon: {
                                type: "string",
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
  formData: {},
  schema1: {
    title: "Add Rule Bucket",
    type: "object",
    properties: {
      preset: {
        type: "string",
        enum: ["Feed", "Video"],
        default: "Video",
      },
    },
    dependencies: {
      preset: {
        oneOf: [
          {
            properties: {
              preset: {
                enum: ["Feed"],
              },
              testFeed: {
                type: "string",
              },
            },
          },
          {
            properties: {
              preset: {
                enum: ["Video"],
              },
              testVideo: {
                type: "string",
              },
            },
          },
        ],
      },
    },
  },
  uiSchema: {
    // 'ui:order': [
    //   'preset',
    //   'rule bucket order',
    //   'placement',
    //   'unit type',
    //   'slot',
    //   'tagId',
    //   'page type',
    //   // 'desktop placement name',
    //   // 'mobile placement name',
    //   // 'package',
    //   'isActive'
    // ],
    "rule bucket order": {
      "ui:widget": "hidden",
    },
  },
};
