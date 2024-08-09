import * as Yup from 'yup';
import i18n from '~/hooks/useTranslation';

const AuthFlowSchemaSignUp = () => {

    const { t } = i18n;

    return Yup.object().shape({
        fullName: Yup.string()
            .required(t('FormValidation.Required')),
        lastName: Yup.string()
            .required(t('FormValidation.Required')),
        email: Yup.string()
            .email(t('FormValidation.EmailInvalid'))
            .required(t('FormValidation.Required')),
        password: Yup.string()
            .min(6, t('FormValidation.PasswordInvalid', { min: 6 }))
            .required(t('FormValidation.Required')),
    });
};

export default AuthFlowSchemaSignUp;