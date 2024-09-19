<template>
    <div class="form-group">
        <label :for="id">{{ label }}</label>
        <component
            :is="inputType"
            :value="modelValue"
            :id="id"
            :required="required"
            :placeholder="placeholder"
            :minlength="minlength"
            type="text"
            @input="$emit('update:modelValue', $event)"
        ></component>
        <small v-if="inputType === 'input' && minlength">{{ message }}</small>
    </div>
</template>

<script>
export default {
    props: {
        id: { type: String, required: true },
        label: { type: String, required: true },
        modelValue: { type: String, required: true },
        required: { type: Boolean, default: false },
        placeholder: { type: String, default: '' },
        minlength: { type: Number, default: null },
        inputType: { type: String, default: 'input' }, // 'input' or 'select'
        options: { type: Array, default: () => [] } // For select options
    },
    computed: {
        message() {
            return `Min of ${this.minlength} characters`;
        }
    }
};
</script>

<style scoped>
.form-group {
    margin-bottom: 1em;
}
label {
    display: block;
    margin-bottom: .5em;
}
input, select {
    width: 100%;
    padding: .5em;
    box-sizing: border-box;
}
small {
    display: block;
    margin-top: .5em;
    color: #6c757d;
}
</style>
