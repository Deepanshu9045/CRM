import { addDoc, collection, deleteDoc, doc, getDocs, limit, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase-client";

export type LeadStatusMachine = "new" | "contacted" | "qualified" | "proposal_sent" | "won" | "lost";
export type LeadSource = "Website" | "Facebook" | "Referral" | "Email Campaign" | "Cold Call" | string;

export interface LeadDoc {
  fullName: string;
  company?: string;
  email?: string;
  phone?: string;
  source?: LeadSource;
  status: LeadStatusMachine;
  assignedTo?: string;
  notes?: string;
  expectedValue?: number;
  followUpDate?: string; // ISO string
  createdAt: any; // Firestore Timestamp
}

export async function listLeads(limitCount = 100) {
  const q = query(collection(db, "leads"), orderBy("createdAt", "desc"), limit(limitCount));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data() as any;
    return {
      id: d.id,
      name: data.fullName || "",
      company: data.company || "",
      email: data.email || "",
      phone: data.phone || "",
      source: data.source || "Website",
      status: data.status || "new",
      assignedTo: data.assignedTo || "",
      createdAt: (data.createdAt?.toDate ? data.createdAt.toDate() : new Date()).toISOString(),
    } as {
      id: string;
      name: string;
      company: string;
      email: string;
      phone: string;
      source: LeadSource;
      status: LeadStatusMachine;
      assignedTo: string;
      createdAt: string;
    };
  });
}

export async function addLead(payload: Omit<LeadDoc, "createdAt">) {
  const ref = await addDoc(collection(db, "leads"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function bulkDeleteLeads(ids: string[]) {
  // Simple sequential deletes; can be optimized with writeBatch
  await Promise.all(ids.map((id) => deleteDoc(doc(db, "leads", id))));
}

export function uiToStatusMachine(ui: string): LeadStatusMachine {
  switch (ui) {
    case "New":
      return "new";
    case "Contacted":
      return "contacted";
    case "Qualified":
      return "qualified";
    case "Proposal Sent":
      return "proposal_sent";
    case "Converted":
      return "won";
    case "Lost":
      return "lost";
    default:
      return "new";
  }
}

export function statusMachineToUi(s: LeadStatusMachine): string {
  switch (s) {
    case "new":
      return "New";
    case "contacted":
      return "Contacted";
    case "qualified":
      return "Qualified";
    case "proposal_sent":
      return "Proposal Sent";
    case "won":
      return "Converted";
    case "lost":
      return "Lost";
    default:
      return "New";
  }
}
