'use client'

// app/components/MultiSelect.tsx
'use client'
import React, { useEffect } from 'react'
import Select from 'react-select'
import type { CustomOption } from './generate-options'
import palette from '@/utils/palette/palette'
import { useSearch } from './search-sidebar-context'

type Option = { value: string; label: string }


const ReactMultiSelect = ({options, label, keyName}: {options: CustomOption[], label: string, keyName: string}) => {
  const [value, setValue] = React.useState<CustomOption[]>([])
  const { appWideSearch, selectAttributeQuery } = useSearch()


  useEffect(() => {
    if(appWideSearch.attributes?.[keyName]){
      setValue(appWideSearch.attributes[keyName] as CustomOption[])
    }
  }, [appWideSearch.attributes])


  return (
    <Select<Option, true>
        styles={{
            control: (base) => ({
                ...base,
                backgroundColor: palette["olive"],
            }),
            menu: (base) => ({
                ...base,
                backgroundColor: palette["olive"],
            }),
            option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? palette["olive"] : palette["darkBrown"],
            }),
        }}
      isMulti
      options={options}
      value={value}
      onChange={(opts) => {
        setValue((opts as Option[]) ?? [])
        console.log('opts', opts)
        selectAttributeQuery(keyName, opts as any[])
      }}
      placeholder="Pick multiple…"
    />
  )
}

export default ReactMultiSelect
