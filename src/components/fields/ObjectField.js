import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  orderProperties,
  retrieveSchema,
  getDefaultRegistry,
  clearDependencies,
  toIdSchema,
} from "../../utils";
import validate from "../../validate";

function DefaultObjectFieldTemplate(props) {
  const { DescriptionField } = props;
  return (
    <fieldset>
      {props.description && (
        <DescriptionField
          id={`${props.idSchema.$id}__description`}
          description={props.description}
          formContext={props.formContext}
        />
      )}
      {props.properties.map(prop => prop.content)}
    </fieldset>
  );
}

class ObjectField extends Component {
  static defaultProps = {
    uiSchema: {},
    formData: {},
    errorSchema: {},
    ignoreDefaults: {},
    idSchema: {},
    required: false,
    disabled: false,
    readonly: false,
  };

  isRequired(name) {
    const schema = this.props.schema;
    return (
      Array.isArray(schema.required) && schema.required.indexOf(name) !== -1
    );
  }

  clearSchemaDependencies = (retrievedSchema, name) => {
    return data => {
      return clearDependencies(data, retrievedSchema, name);
    };
  };

  onPropertyChange = name => {
    return (
      value,
      changeByTheUser,
      errorsFromChildObject,
      checkedChildObject
    ) => {
      const {
        formData,
        schema,
        onChange,
        ignoreDefaults,
        errorSchema,
      } = this.props;
      const retrievedSchema = retrieveSchema(schema, undefined, formData);
      let clearObjDependencies = this.clearSchemaDependencies(
        retrievedSchema,
        name
      );

      let clearedChangedByTheUser = clearObjDependencies(ignoreDefaults);
      let newIgnoreDefaults = {
        ...clearedChangedByTheUser,
        [name]: changeByTheUser,
      };

      let clearedFormData = clearObjDependencies(formData);
      let newFormData = { ...clearedFormData, [name]: value };

      let errors = checkedChildObject
        ? { [name]: errorsFromChildObject }
        : {
            [name]: validate(newFormData, schema).errorSchema[name] || {
              __errors: [],
            },
          };
      let clearedErrors = clearObjDependencies(errorSchema);
      let newErrors = { ...clearedErrors, ...errors };

      onChange(newFormData, newIgnoreDefaults, newErrors, true);
    };
  };

  render() {
    const {
      uiSchema,
      formData,
      errorSchema,
      idSchema,
      name,
      required,
      disabled,
      readonly,
      onBlur,
      ignoreDefaults,
      onFocus,
      registry = getDefaultRegistry(),
    } = this.props;
    const { definitions, fields, formContext } = registry;
    const { SchemaField, TitleField, DescriptionField } = fields;
    const schema = retrieveSchema(this.props.schema, definitions, formData);
    const newIdSchema = toIdSchema(
      schema,
      idSchema["$id"],
      definitions,
      idSchema["$id"]
    );
    const title = schema.title === undefined ? name : schema.title;
    const description = uiSchema["ui:description"] || schema.description;
    let orderedProperties;

    try {
      const properties = Object.keys(schema.properties);
      orderedProperties = orderProperties(properties, uiSchema["ui:order"]);
    } catch (err) {
      return (
        <div>
          <p className="config-error" style={{ color: "red" }}>
            Invalid {name || "root"} object field configuration:
            <em>{err.message}</em>.
          </p>
          <pre>{JSON.stringify(schema)}</pre>
        </div>
      );
    }

    const Template = registry.ObjectFieldTemplate || DefaultObjectFieldTemplate;

    const templateProps = {
      title: uiSchema["ui:title"] || title,
      description,
      TitleField,
      DescriptionField,
      properties: orderedProperties.map(name => {
        return {
          content: (
            <SchemaField
              key={name}
              name={name}
              required={this.isRequired(name)}
              schema={schema.properties[name]}
              uiSchema={uiSchema[name]}
              errorSchema={errorSchema[name]}
              idSchema={newIdSchema[name]}
              formData={formData[name]}
              ignoreDefaults={ignoreDefaults[name]}
              onChange={this.onPropertyChange(name)}
              onBlur={onBlur}
              onFocus={onFocus}
              registry={registry}
              disabled={disabled}
              readonly={readonly}
            />
          ),
          name,
          readonly,
          disabled,
          required,
        };
      }),
      required,
      idSchema,
      uiSchema,
      schema,
      formData,
      formContext,
    };
    return <Template {...templateProps} />;
  }
}

if (process.env.NODE_ENV !== "production") {
  ObjectField.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    errorSchema: PropTypes.object,
    idSchema: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    formData: PropTypes.object,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    registry: PropTypes.shape({
      widgets: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.func, PropTypes.object])
      ).isRequired,
      fields: PropTypes.objectOf(PropTypes.func).isRequired,
      definitions: PropTypes.object.isRequired,
      formContext: PropTypes.object.isRequired,
    }),
  };
}

export default ObjectField;
