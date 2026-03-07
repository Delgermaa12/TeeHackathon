import React from 'react';

type Status = 'active' | 'inactive' | 'pending' | 'draft' | 'published' | 'archived' | 'new' | 'in_review' | 'approved' | 'rejected' | 'resolved';

interface StatusBadgeProps {
    status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const getStatusStyle = () => {
        switch (status) {
            case 'active':
            case 'published':
            case 'approved':
            case 'resolved':
                return 'bg-green-500/10 text-green-600 border-green-500/20';
            case 'inactive':
            case 'archived':
            case 'rejected':
                return 'bg-red-500/10 text-red-600 border-red-500/20';
            case 'pending':
            case 'draft':
            case 'new':
            case 'in_review':
                return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
            default:
                return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
        }
    };

    const getStatusLabel = () => {
        switch (status) {
            case 'active': return 'Идэвхтэй';
            case 'inactive': return 'Идэвхгүй';
            case 'pending': return 'Хүлээгдэж буй';
            case 'draft': return 'Ноорог';
            case 'published': return 'Нийтлэгдсэн';
            case 'archived': return 'Архивлагдсан';
            case 'new': return 'Шинэ';
            case 'in_review': return 'Шалгагдаж буй';
            case 'approved': return 'Зөвшөөрсөн';
            case 'rejected': return 'Татгалзсан';
            case 'resolved': return 'Шийдэгдсэн';
            default: return status;
        }
    };

    return (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wide inline-flex items-center justify-center whitespace-nowrap ${getStatusStyle()}`}>
            {getStatusLabel()}
        </span>
    );
}
