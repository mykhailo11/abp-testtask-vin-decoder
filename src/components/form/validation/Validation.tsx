import type { Translator, ValidationContext } from '@/types/types';
import { useEffect, useState, type PropsWithChildren, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type Props = PropsWithChildren & {
    value?: string | undefined
    errorClass?: string | undefined
    validation?: ValidationContext
}

export default function Validation({ children, validation, value, errorClass }: Props): ReactNode {
    const { t }: Translator = useTranslation("translation");
    const [message, setMessage] = useState<string | undefined>();
    useEffect(
        () => {
            const timeoutId: number = setTimeout(
                () => {
                    const error: any = validation?.validations.find(context => !context.validate(value));
                    setMessage(error?.message);
                    validation?.valid(error === undefined);
                }, 
                800
            );
            return () => clearTimeout(timeoutId);
        },
        [value, validation]
    );
    return (
        <div className={`${message && errorClass} flex-col gap-1`}>
            {children}
            {message && <div className='fnt-3 error'>{t(message)}</div>}
        </div>
    )
}
