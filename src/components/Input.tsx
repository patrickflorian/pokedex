import { Listbox, Transition } from '@headlessui/react'
import React, {
  FC,
  Fragment,
  InputHTMLAttributes,
  ReactNode
} from 'react'


export interface MenuItems<T> {
  value?: T | T[],
  onChange?: (value: T | T[]) => void,
  menus?: Array<T>,
  labelClasseName?: string,
  itemClasseName?: string,
  buttonClassName?: string,
  multiple?: boolean
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  selectProps?: MenuItems<string>,
  error?: ReactNode | string,
  readonly type?: 'text' |
  'number' |
  'date' |
  'textarea' |
  'select' |
  'select_multiple',
  handleBlur?: () => void
}


const Input: FC<InputProps> = ({
  type = 'text',
  error,
  selectProps,
  className,
  ...props
}) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  function reduceMultiple(items: string[]) {
    return (items).join(', ')
  }

  function isSelected(value: string) {
    // @ts-ignore
    return (selectedOptions.find((el) => el.id === value.id) ? true : false);
  }

  function handleSelect(value: string) {
    // if (Array.isArray(values)) {
    let selectedstrings = [
      // @ts-ignore
      ...selectedOptions ?? [],
    ];

    if (!isSelected(value)) {
      // @ts-ignore
      selectedstrings.push((selectProps?.menus ?? []).find((el) => el === value));
    } else {
      selectedstrings = selectedstrings.filter((el) => el !== value);
    }
    setSelectedOptions(selectedstrings)
    setIsOpen(true);
    selectProps?.onChange?.(selectedstrings);
    // }
    // else
    //   selectProps?.onChange?.(values);
  }

  return (
    <label className='w-full' htmlFor={props.id || "input"}>
      {type === 'textarea' ?
        <textarea
          id={props.id || "input"}
          className={`textstring w-full rounded pt-10 ${error ? ' border-red-600 placeholder:text-red-600' : ''} ${className}`}
          {...props}
        /> : null
      }
      {type === 'select' ?
        <>
          <div className={`w-full ${className}`} {...props}>
            <Listbox
              value={selectProps?.value}
              onChange={(value) => selectProps?.onChange?.(value)}
            >
              <div className="w-full relative md:h-auto">
                <Listbox.Button
                  className={`relative flex w-full h-[38px] items-center rounded text-variant-800 focus:border-variant-700  cursor-default px-5 text-left border border-variant-600 ${selectProps?.buttonClassName ?? ''}`}
                  onBlur={(e: any) => props.onBlur?.(e)}
                  onClick={() => {props.handleBlur?.(); }}
                >
                  <span className={`block truncate font-medium  ${selectProps?.labelClasseName ?? 'text-variant-200'}`}>
                    {Array.isArray(selectProps?.value)
                      // @ts-ignore
                      ? `${reduceMultiple(selectProps?.value)}`
                      // @ts-ignore
                      : selectProps?.value}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 -right-1 flex items-center ">
                    
                  </span>

                  <span className={`${(Array.isArray(selectProps?.value) ? (selectProps?.value && selectProps?.value?.length > 0) : selectProps?.value) ? 'invisible' : 'visible'} absolute top-0 h-full flex items-center ml-5 text-variant-600`}>{props.placeholder}</span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {selectProps?.menus?.map((item, i) => (
                      <Listbox.Option
                        key={i}
                        className={({ active, selected }) => `relative cursor-default select-none py-2 pl-2 pr-4  mx-2 text-[17px] ${selectProps?.itemClasseName} ${active ? `${selected ? 'bg-primary text-variant-200' : 'bg-primary-light bg-opacity-[0.15] text-primary'} rounded` : 'text-gray-900'}`}
                        value={item}
                      >
                        {({ selected, active }) => (
                          <span className={`${selected ? 'font-medium' : 'font-normal'}`}>
                            {item}
                          </span>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            {/* {error ? <span className="flex text-[13px] text-red-600">{error}</span> : null} */}
          </div>
        </> : null
      }
      {type === 'select_multiple' ?
        <>
          <div className={`w-full ${className}`} {...props}>
            <Listbox
              value={selectProps?.value}
              // @ts-ignore
              onChange={(value) => handleSelect(value)}
              // @ts-ignore
              open={isOpen}
            >
              <div className="w-full relative md:h-auto">
                <Listbox.Button
                  className={`relative flex w-full h-[55px] items-center rounded text-variant-800 focus:border-variant-700  cursor-default px-5 text-left border border-variant-600 ${error ? ' border-red-600 focus:border-red-600' : ''} ${selectProps?.buttonClassName ?? ''}`}
                  onBlur={(e: any) => props.onBlur?.(e)}
                  onClick={() => { setIsOpen(!isOpen); props.handleBlur?.(); }}
                  // @ts-ignore
                  open={isOpen}
                >
                  <span className={`block truncate font-medium ml-5 ${selectProps?.labelClasseName ?? 'text-variant-500'}`}>
                    {`${reduceMultiple(selectedOptions)}`}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 -right-1 flex items-center ">
                    
                  </span>

                  <span className={`${(selectedOptions && selectedOptions?.length > 0) ? 'invisible' : 'visible'} absolute top-0 h-full flex items-center ml-5 text-variant-600`}>{props.placeholder}</span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  // show={isOpen}
                >
                  <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {selectProps?.menus?.map((item, i) => (
                      <Listbox.Option
                        key={i}
                        className={({ active, selected }) => `relative cursor-default select-none py-2 pl-2 pr-4  mx-2 text-[17px] ${selectProps?.itemClasseName} ${active ? `${isSelected(item) ? 'bg-primary text-variant-200' : 'bg-primary-light bg-opacity-[0.15] text-primary'} rounded` : 'text-gray-900'}`}
                        value={item}
                      >
                        {({ selected, active }) => (
                          <span className={`${isSelected(item) ? 'font-medium' : 'font-normal'}`}>
                            {item}
                          </span>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            {/* {error ? <span className="flex text-[13px] text-red-600">{error}</span> : null} */}
          </div>
        </> : null
      }
      {
        type !== 'textarea' && type !== 'select' && type !== 'select_multiple' ?
          <input
            id={props.id || "input"}
            className={`rounded border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm w-full  ${error ? ' border-red-600 focus:border-red-600' : ''} ${className}`}
            {...props}
          /> : null
      }
      {error ? <div className="ml-6"><span className="text-[13px] text-red-600">{error}</span></div> : null}
    </label >
  )
}

export default Input