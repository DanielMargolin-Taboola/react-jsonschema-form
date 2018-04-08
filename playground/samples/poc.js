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
                default: 200,
              },
              "desktop placement name": {
                type: "string",
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
                default: 1000,
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
                              "some thing": {
                                type: "string",
                                default: "blaaa",
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
                default: 200,
              },
              "desktop placement name": {
                type: "string",
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
                default: 1000,
              },
              placement: {
                type: "string",
              },
              action_values: {
                type: "object",
                properties: {
                  "unit type": {
                    type: "string",
                    enum: ["integrated widget", "slider"],
                    default: "integrated widget",
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
                                  "some thing": {
                                    type: "string",
                                    default: "blaaa",
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
          },
        ],
      },
    },
  },
};
