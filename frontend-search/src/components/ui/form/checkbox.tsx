import React from 'react';


interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  lang: string;
  label?: string | any;
}
export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ lang, label, ...rest }, ref) => {
    return (
      <label className="group flex items-center flex-start gap-4 text-brand-dark text-sm cursor-pointer transition-all hover:text-brand py-2 last:border-b-0 last:pb-0 first:pt-0">
          <input
              type="checkbox"
              className="form-checkbox text-yellow-100 w-[22px] h-[22px] border-2 border-border-four rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-yellow-100 focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-yellow-100 hover:checked:bg-yellow-100"
              ref={ref}
              {...rest}
          />
          <span className="ltr:mr-3.5 rtl:ml-3.5 -mt-0.5">
          {label ? label : label}
        </span>

      </label>
    );
  }
);

CheckBox.displayName = 'CheckBox';
