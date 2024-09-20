<template>
    <div class="form-group">
      <label :for="id">{{ label }}</label>
      
      <!-- Check if the field type is 'select' -->
      <select
        v-if="type === 'select'"
        :id="id"
        v-model="valueProxy"
        :required="required"
      >
        <option disabled value="">{{ placeholder }}</option>
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      
      <!-- Default input for non-select fields -->
      <input
        v-else
        :type="type"
        :id="id"
        v-model="valueProxy"
        :placeholder="placeholder"
        :required="required"
        :minlength="minlength"
      />
      
      <small v-if="minlength && type === 'password'">{{ `Min of ${minlength} characters` }}</small>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FormField',
    props: {
      value: [String, Boolean],  // Can be text, checkbox, or select values
      type: {
        type: String,
        default: 'text',
      },
      label: String,
      id: String,
      placeholder: String,
      required: {
        type: Boolean,
        default: false,
      },
      minlength: {
        type: String,
        default: "6",
      },
      options: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      valueProxy: {
        get() {
          return this.value;
        },
        set(newValue) {
          this.$emit('input', newValue); // Emit value changes for v-model sync
        },
      },
    },
  };
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 1em;
  }
  label {
    display: block;
    margin-bottom: 0.5em;
  }
  input, select {
    width: 100%;
    padding: 0.5em;
    box-sizing: border-box;
  }
  small {
    display: block;
    margin-top: 0.5em;
    color: #6c757d;
  }
  </style>
  