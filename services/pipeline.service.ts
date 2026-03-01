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
    where,
} from "firebase/firestore";
import { db } from "@/lib/firebase-client";

export type DealStage =
    | "Lead In"
    | "Contact Made"
    | "Qualified"
    | "Proposal Sent"
    | "Negotiation"
    | "Won"
    | "Lost";

export type DealPriority = "Low" | "Medium" | "High" | "Urgent";
export type DealStatus = "Active" | "Won" | "Lost";

export interface DealDoc {
    id: string;
    dealName: string;
    companyName: string;
    relatedLeadId?: string;
    value: number;
    stage: DealStage;
    probability: number;
    priority: DealPriority;
    assignedTo: string;
    assignedToAvatar?: string;
    expectedCloseDate: string; // ISO String
    status: DealStatus;
    notes?: string;
    createdAt: string; // ISO String
    updatedAt: string; // ISO String
}

export type CreateDealPayload = Omit<DealDoc, "id" | "createdAt" | "updatedAt">;

export const PIPELINE_STAGES: DealStage[] = [
    "Lead In",
    "Contact Made",
    "Qualified",
    "Proposal Sent",
    "Negotiation",
    "Won",
    "Lost",
];

export async function listDeals(limitCount = 100): Promise<DealDoc[]> {
    const q = query(
        collection(db, "deals"),
        orderBy("createdAt", "desc"),
        limit(limitCount)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
        const data = d.data() as any;
        return {
            id: d.id,
            dealName: data.dealName || "",
            companyName: data.companyName || "",
            relatedLeadId: data.relatedLeadId || "",
            value: data.value || 0,
            stage: data.stage || "Lead In",
            probability: data.probability || 0,
            priority: data.priority || "Medium",
            assignedTo: data.assignedTo || "",
            assignedToAvatar: data.assignedToAvatar || "",
            expectedCloseDate: data.expectedCloseDate || "",
            status: data.status || "Active",
            notes: data.notes || "",
            createdAt: (data.createdAt?.toDate ? data.createdAt.toDate() : new Date()).toISOString(),
            updatedAt: (data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date()).toISOString(),
        };
    });
}

export async function addDeal(payload: CreateDealPayload): Promise<string> {
    const ref = await addDoc(collection(db, "deals"), {
        ...payload,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return ref.id;
}

export async function updateDeal(
    id: string,
    updates: Partial<Omit<DealDoc, "id" | "createdAt">>
): Promise<void> {
    const docRef = doc(db, "deals", id);
    await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
    });
}

export async function deleteDeal(id: string): Promise<void> {
    await deleteDoc(doc(db, "deals", id));
}
