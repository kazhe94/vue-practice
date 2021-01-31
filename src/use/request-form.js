import {useField, useForm} from "vee-validate";
import * as yup from "yup";


export function useRequestForm(fn) {
    const {isSubmitting, handleSubmit} = useForm({
        initialValues: {
            status: 'active'
        }
    })

    const {value: name, errorMessage: nError, handleBlur: nBlur} = useField(
        'name',
        yup.string()
            .trim()
            .required('Введите ФИО клиента')
        )
    const {value: phone, errorMessage: pError, handleBlur: pBlur} = useField(
        'phone',
        yup.string()
            .trim()
            .required('Введите телефон')
        )
    const {value: sum, errorMessage: sError, handleBlur: sBlur} = useField(
        'sum',
        yup.number()
            .required('Введите сумму')
            .min(0, 'Сумма не может быть меньше нуля')
        )
    const {value: status} = useField('status')

    const onSubmit = handleSubmit(fn)

    return {
        status,
        isSubmitting,
        onSubmit,
        name,
        phone,
        sum,
        nBlur,nError,
        pBlur,pError,
        sBlur,sError
    }
}