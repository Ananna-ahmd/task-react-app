import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {Card, CardContent,CardHeader,CardTitle} from "@/components/ui/card";
import {Plus,Pencil,Trash2,CheckCircle, XCircle} from "lucide-react";
import { Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import {type BreadcrumbItem} from "@/types";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import { Textarea } from "@headlessui/react";
import {useForm} from "@inertiajs/react";

interface List {
    id: number;
    title: string;
    description: string|null;
    tasks_count?: number;
}

interface Props {
    lists: List[];
    flash?: {
        success?: string;
        error?: string;

    }
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lists',
        href: '/lists',
    },
];

export default function ListIndex({ lists, flash }: Props) {
const[isOpen, setIsOpen] = useState(false);
const [editingList, setEditingList] = useState<List | null>(null);
const [showToast, setShowToast] = useState(false);
const [toastMessage, setToastMessage] = useState('');
const [toastType, setToastType] = useState<'success'|'error'>('success');

useEffect(() => {
    if (flash?.success) {
        setToastMessage(flash.success);
        setToastType('success');
        setShowToast(true);
        } else if (flash?.error) {
            setToastMessage(flash.error);
            setToastType('error');
            setShowToast(true);
        }
}, [flash]);


useEffect(() => {
    if (showToast) {
        const timer = setTimeout(() => {
            setShowToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
}, [showToast]);

const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    description: '',
});

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingList) {
        put(route('lists.update', { list: editingList.id }), {
            onSuccess: () => {
                setIsOpen(false);
                reset();
                setEditingList(null);
            },
        });
        } else {
            post(route('lists.store'), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
                });
                }
                };

        const handleEdit = (list: List) => {
            setEditingList(list);
            setData({
                title: list.title,
                description: list.description || '',
                });
                setIsOpen(true);
                };

          const handleDelete = (listId: number) => {
            destroy(route('lists.destroy', listId));

            };























    function put(arg0: string, arg1: { onSuccess: () => void; }) {
        throw new Error("Function not implemented.");
    }

    function destroy(arg0: string) {
        throw new Error("Function not implemented.");
    }

