import React, { useState } from 'react';
import { PageHeader } from '../../components/admin/PageHeader';
import { FilterBar } from '../../components/admin/FilterBar';
import { DataTable, type Column } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { DrawerPanel } from '../../components/admin/DrawerPanel';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { MessageSquare, Eye, Trash2 } from 'lucide-react';
import type { Request } from '../../types/admin';
import { useAppContext } from '../../context/AppContext';
import { useDataContext } from '../../context/DataContext';
import { useAlertContext } from '../../context/AlertContext';

export function RequestsView() {
    const { theme } = useAppContext();
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const { requests, updateRequest, deleteRequest } = useDataContext();
    const { showAlert } = useAlertContext();

    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
    const [isDrawOpen, setIsDrawOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [requestToDelete, setRequestToDelete] = useState<string | null>(null);

    const handleView = (request: Request) => {
        setSelectedRequest(request);
        setIsDrawOpen(true);
    };

    const handleDeleteClick = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setRequestToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (requestToDelete) {
            deleteRequest(requestToDelete);
            showAlert('Хүсэлт амжилттай устгагдлаа', 'success');
            setRequestToDelete(null);
            setIsDeleteDialogOpen(false);
        }
    };

    const handleStatusUpdate = (newStatus: 'new' | 'in_review' | 'resolved') => {
        if (selectedRequest) {
            updateRequest(selectedRequest.id, { status: newStatus });
            setSelectedRequest({ ...selectedRequest, status: newStatus });
            showAlert(`Хүсэлтийн төлөв "${newStatus}" болж шинэчлэгдлээ`, 'success');
        }
    };

    const filteredRequests = requests.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
        const matchesType = typeFilter ? r.type === typeFilter : true;
        const matchesStatus = statusFilter ? r.status === statusFilter : true;
        return matchesSearch && matchesType && matchesStatus;
    });

    const columns: Column<Request>[] = [
        {
            header: 'Овог Нэр',
            accessorKey: 'name',
            cell: ({ row }) => <span className="font-bold">{row.name}</span>,
            sortable: true
        },
        {
            header: 'Холбоо барих',
            accessorKey: 'phone',
            cell: ({ row }) => (
                <div className="flex flex-col text-xs">
                    <span className="font-bold">{row.phone || '-'}</span>
                    <span className={`${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{row.email || '-'}</span>
                </div>
            )
        },
        {
            header: 'Ач холбогдол',
            accessorKey: 'priority',
            cell: ({ row }) => (
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded ${row.priority === 'high' ? 'bg-red-500/10 text-red-500' :
                    row.priority === 'medium' ? 'bg-orange-500/10 text-orange-500' :
                        'bg-blue-500/10 text-blue-500'
                    }`}>
                    {row.priority}
                </span>
            ),
            sortable: true
        },
        {
            header: 'Төрөл',
            accessorKey: 'type',
            cell: ({ row }) => <span className="text-xs uppercase tracking-widest">{row.type}</span>
        },
        {
            header: 'Огноо',
            accessorKey: 'createdAt',
            cell: ({ row }) => <span className="text-xs">{new Date(row.createdAt).toLocaleDateString()}</span>,
            sortable: true
        },
        {
            header: 'Статус',
            accessorKey: 'status',
            cell: ({ row }) => <StatusBadge status={row.status} />
        },
        {
            header: 'Үйлдэл',
            accessorKey: 'id',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); handleView(row); }} className={`p-1.5 rounded-lg border transition-all ${theme === 'dark' ? 'border-white/5 hover:bg-white/5 text-white/40 hover:text-white' : 'border-black/5 hover:bg-black/5 text-black/40 hover:text-black'}`}>
                        <Eye size={14} />
                    </button>
                    <button onClick={(e) => handleDeleteClick(row.id, e)} className={`p-1.5 rounded-lg border transition-all ${theme === 'dark' ? 'border-white/5 hover:bg-red-500/10 text-red-500/60 hover:text-red-500' : 'border-black/5 hover:bg-red-500/10 text-red-500/60 hover:text-red-500'}`}>
                        <Trash2 size={14} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PageHeader
                title="Хүсэлтүүд"
                description="Хэрэглэгчдээс ирсэн санал, хүсэлт, бүртгэлүүд"
                icon={MessageSquare}
            />

            <FilterBar
                searchQuery={search}
                onSearchChange={setSearch}
                searchPlaceholder="Нэрээр хайх..."
                filters={[
                    {
                        key: 'type',
                        label: 'Төрөл',
                        value: typeFilter,
                        onChange: setTypeFilter,
                        options: [
                            { label: 'Сургалтын', value: 'training' },
                            { label: 'Багшийн', value: 'teacher' },
                            { label: 'Тусламж', value: 'support' },
                            { label: 'Холбоо барих', value: 'contact' }
                        ]
                    },
                    {
                        key: 'status',
                        label: 'Статус',
                        value: statusFilter,
                        onChange: setStatusFilter,
                        options: [
                            { label: 'Шинэ', value: 'new' },
                            { label: 'Шалгагдаж буй', value: 'in_review' },
                            { label: 'Шийдэгдсэн', value: 'resolved' }
                        ]
                    }
                ]}
            />

            <DataTable columns={columns} data={filteredRequests} onRowClick={handleView} selectable />

            <DrawerPanel
                isOpen={isDrawOpen}
                onClose={() => setIsDrawOpen(false)}
                title="Хүсэлтийн дэлгэрэнгүй"
                footer={
                    <button onClick={() => setIsDrawOpen(false)} className={`w-full px-4 py-3 rounded-xl text-xs font-bold border transition-all ${theme === 'dark' ? 'border-white/10 hover:bg-white/5 text-white' : 'border-black/10 hover:bg-black/5 text-black'}`}>Хаах</button>
                }
            >
                {selectedRequest && (
                    <div className="space-y-6">
                        <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg">{selectedRequest.name}</h3>
                                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>Илгээсэн: {new Date(selectedRequest.createdAt).toLocaleString()}</p>
                                </div>
                                <StatusBadge status={selectedRequest.status} />
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm mt-6">
                                <div>
                                    <p className={`text-[10px] uppercase font-bold tracking-widest mb-1 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Утас</p>
                                    <p className="font-semibold">{selectedRequest.phone || '-'}</p>
                                </div>
                                <div>
                                    <p className={`text-[10px] uppercase font-bold tracking-widest mb-1 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>И-мэйл</p>
                                    <p className="font-semibold">{selectedRequest.email || '-'}</p>
                                </div>
                                <div>
                                    <p className={`text-[10px] uppercase font-bold tracking-widest mb-1 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Төрөл</p>
                                    <p className="font-semibold uppercase tracking-wider text-xs">{selectedRequest.type}</p>
                                </div>
                                <div>
                                    <p className={`text-[10px] uppercase font-bold tracking-widest mb-1 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Ач холбогдол</p>
                                    <p className="font-semibold uppercase tracking-wider text-xs">{selectedRequest.priority}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-sm mb-3">Статус өөрчлөх</h4>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => handleStatusUpdate('new')}
                                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${selectedRequest.status === 'new' ? 'bg-blue-500/20 border-blue-500/30 text-blue-500' : theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'}`}
                                >
                                    Шинэ
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate('in_review')}
                                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${selectedRequest.status === 'in_review' ? 'bg-orange-500/20 border-orange-500/30 text-orange-500' : theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'}`}
                                >
                                    Шалгагдаж буй
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate('resolved')}
                                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${selectedRequest.status === 'resolved' ? 'bg-green-500/20 border-green-500/30 text-green-500' : theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'}`}
                                >
                                    Шийдэгдсэн
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </DrawerPanel>

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={confirmDelete}
                title="Хүсэлт устгах"
                message="Та энэ хүсэлтийг устгахдаа итгэлтэй байна уу? Устгасан хүсэлтийг сэргээх боломжгүй."
            />
        </div>
    );
}
