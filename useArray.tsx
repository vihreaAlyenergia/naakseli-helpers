import React, { useState } from 'react'

export interface ArrayHook<T, TEditableColumns = any> {
	list: T[]
	set: React.Dispatch<React.SetStateAction<T[]>>
	add: (inputColumns: T) => void
	update: (id: number, editObj: TEditableColumns, onlyState?: boolean) => void
	delete: (id: number) => void
}

interface BaseElement {
	id: number
}

export function useArray<
	T extends BaseElement,
	TEditableColumns = any
>(): ArrayHook<T, TEditableColumns> {
	const [elements, setElements] = useState<T[]>([])

	const add = (element: T) => setElements((state) => [...state, element])

	const update = (id: number, editObj: TEditableColumns) =>
		setElements((state) =>
			state.map((oldElement) => {
				if (oldElement.id === id) return { ...oldElement, ...editObj }
				else return oldElement
			})
		)

	const deleteById = (id: number) =>
		setElements((state) => state.filter((handout) => handout.id !== id))

	return {
		list: elements,
		set: setElements,
		add,
		update,
		delete: deleteById,
	}
}
