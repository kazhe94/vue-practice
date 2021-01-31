import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {computed, watch} from "vue";
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useLoginForm() {
    const router = useRouter()
    const store = useStore()
    const {handleSubmit, isSubmitting, submitCount} = useForm()

    const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        yup
            .string()
            .trim()
            .required('Поле email не может быть пустым')
            .email('Введён некорректный email')
    )
    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup
            .string()
            .trim()
            .required('Введите пароль')
            .min(6, 'Минимальная длина пароля 6 символов')
    )

    const onSubmit = handleSubmit(async (values)=> {
        try {
            console.log(values)
            await store.dispatch('auth/login', values)
            router.push('/')
        } catch (e) {

        }
    })

    const isTooManyAttempts = computed(()=> submitCount.value >= 3)

    watch(isTooManyAttempts, val=> {
        if(val) {
            setTimeout(()=> submitCount.value = 0, 3000 )
        }
    })

    return {
        email,
        password,
        eError,
        pError,
        eBlur,
        pBlur,
        onSubmit,
        isSubmitting,
        isTooManyAttempts
    }
}