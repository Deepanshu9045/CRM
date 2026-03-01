import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    limit,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase-client";

export type TaskStatus = "Pending" | "In Progress" | "Completed" | "Overdue" | "Cancelled";
export type TaskPriority = "Low" | "Medium" | "High" | "Urgent";
export type TaskType = "Call" | "Meeting" | "Email" | "Demo" | "Follow-up" | "Other";
export type RelatedEntity = "Lead" | "Customer" | "Deal";

export interface TaskDoc {
    id: string;
    title: string;
    description?: string;
    relatedToId?: string;
    relatedToName?: string;
    relatedToType?: RelatedEntity;
    taskType: TaskType;
    priority: TaskPriority;
    status: TaskStatus;
    assignedTo?: string;
    dueDate: string; // ISO String
    reminderTime?: string; // ISO String
    notes?: string;
    createdAt: string; // ISO String
    completedAt?: string; // ISO String
}

export type CreateTaskPayload = Omit<TaskDoc, "id" | "createdAt" | "completedAt">;

export async function listTasks(limitCount = 100): Promise<TaskDoc[]> {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"), limit(limitCount));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
        const data = d.data() as any;
        return {
            id: d.id,
            title: data.title || "",
            description: data.description || "",
            relatedToId: data.relatedToId || "",
            relatedToName: data.relatedToName || "",
            relatedToType: data.relatedToType || "Lead",
            taskType: data.taskType || "Other",
            priority: data.priority || "Medium",
            status: data.status || "Pending",
            assignedTo: data.assignedTo || "",
            dueDate: data.dueDate || "",
            reminderTime: data.reminderTime || "",
            notes: data.notes || "",
            createdAt: (data.createdAt?.toDate ? data.createdAt.toDate() : new Date()).toISOString(),
            completedAt: data.completedAt?.toDate ? data.completedAt.toDate().toISOString() : undefined,
        };
    });
}

export async function addTask(payload: CreateTaskPayload): Promise<string> {
    const ref = await addDoc(collection(db, "tasks"), {
        ...payload,
        createdAt: serverTimestamp(),
    });
    return ref.id;
}

export async function updateTask(id: string, updates: Partial<Omit<TaskDoc, "id" | "createdAt">>): Promise<void> {
    const docRef = doc(db, "tasks", id);
    const dataToUpdate: any = { ...updates };

    if (updates.status === "Completed" && dataToUpdate.completedAt === undefined) {
        dataToUpdate.completedAt = serverTimestamp();
    }

    await updateDoc(docRef, dataToUpdate);
}

export async function bulkDeleteTasks(ids: string[]): Promise<void> {
    await Promise.all(ids.map((id) => deleteDoc(doc(db, "tasks", id))));
}

export async function deleteTask(id: string): Promise<void> {
    await deleteDoc(doc(db, "tasks", id));
}
