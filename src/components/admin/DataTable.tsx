import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { ChevronUp, ChevronDown, CheckSquare, Square } from 'lucide-react';

export interface Column<T> {
    header: string;
    accessorKey: keyof T | string;
    cell?: (info: { row: T; getValue: () => any }) => React.ReactNode;
    sortable?: boolean;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (row: T) => void;
    selectable?: boolean;
    selectedIds?: string[];
    onRowSelect?: (id: string, selected: boolean) => void;
    onSelectAll?: (selected: boolean) => void;
    sortConfig?: { key: string; direction: 'asc' | 'desc' } | null;
    onSort?: (key: string) => void;
}

export function DataTable<T extends { id: string | number }>({
    data,
    columns,
    onRowClick,
    selectable,
    selectedIds = [],
    onRowSelect,
    onSelectAll,
    sortConfig,
    onSort
}: DataTableProps<T>) {
    const { theme } = useAppContext();

    const allSelected = data.length > 0 && selectedIds.length === data.length;
    const someSelected = selectedIds.length > 0 && selectedIds.length < data.length;

    return (
        <div className={`w-full overflow-x-auto rounded-2xl border ${theme === 'dark' ? 'bg-[#151515] border-white/5' : 'bg-white border-black/5 shadow-sm'}`}>
            <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                    <tr className={`${theme === 'dark' ? 'bg-white/[0.02] text-white/40' : 'bg-black/[0.02] text-black/50'} text-xs uppercase font-bold tracking-wider border-b ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
                        {selectable && (
                            <th className="px-6 py-4 w-12 text-center">
                                <button
                                    onClick={() => onSelectAll?.(!allSelected)}
                                    className="p-1 rounded opacity-50 hover:opacity-100 transition-opacity"
                                >
                                    {allSelected ? <CheckSquare size={16} className="text-brand-secondary" /> : <Square size={16} />}
                                </button>
                            </th>
                        )}
                        {columns.map((col, i) => (
                            <th
                                key={i}
                                className={`px-6 py-4 ${col.sortable ? 'cursor-pointer hover:text-brand-secondary transition-colors' : ''}`}
                                onClick={() => col.sortable && col.accessorKey && onSort?.(col.accessorKey as string)}
                            >
                                <div className="flex items-center gap-2">
                                    {col.header}
                                    {sortConfig?.key === col.accessorKey && (
                                        sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={`${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-6 py-12 text-center text-xs opacity-50 font-medium">
                                Дата олдсонгүй
                            </td>
                        </tr>
                    ) : (
                        data.map((row) => (
                            <tr
                                key={row.id}
                                className={`
                                    border-b ${theme === 'dark' ? 'border-white/5 hover:bg-white/[0.02]' : 'border-black/5 hover:bg-black/[0.01]'}
                                    transition-colors ${onRowClick ? 'cursor-pointer' : ''}
                                `}
                                onClick={() => onRowClick?.(row)}
                            >
                                {selectable && (
                                    <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={() => onRowSelect?.(row.id.toString(), !selectedIds.includes(row.id.toString()))}
                                            className="p-1 rounded opacity-50 hover:opacity-100 transition-opacity"
                                        >
                                            {selectedIds.includes(row.id.toString()) ? (
                                                <CheckSquare size={16} className="text-brand-secondary" />
                                            ) : (
                                                <Square size={16} />
                                            )}
                                        </button>
                                    </td>
                                )}
                                {columns.map((col, i) => {
                                    const val = col.accessorKey ? (row as any)[col.accessorKey] : null;
                                    return (
                                        <td key={i} className="px-6 py-4">
                                            {col.cell ? col.cell({ row, getValue: () => val }) : val}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
