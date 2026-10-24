// "use client";

// import {
//   FormEvent,
//   useEffect,
//   useState,
// } from "react";

// export type HierarchyNodeType =
//   | "STATE"
//   | "DISTRICT"
//   | "PINCODE";

// export interface HierarchyNodeCreateData {
//   nodeType: HierarchyNodeType;
//   nodeName: string;
//   nodeCode: string;
//   stateId?: string;
//   stateName?: string;
//   districtId?: string;
//   districtName?: string;
//   pincode?: string;
//   description?: string;
// }

// export interface HierarchyOption {
//   id: string;
//   name: string;
//   code?: string;
// }

// interface NodeCreateModalProps {
//   isOpen: boolean;

//   onClose: () => void;

//   onSubmit?: (
//     data: HierarchyNodeCreateData
//   ) => void | Promise<void>;

//   states?: HierarchyOption[];

//   districts?: HierarchyOption[];

//   defaultNodeType?: HierarchyNodeType;

//   loading?: boolean;

//   title?: string;

//   submitLabel?: string;
// }

// const NODE_TYPE_CONFIG: Record<
//   HierarchyNodeType,
//   {
//     label: string;
//     description: string;
//   }
// > = {
//   STATE: {
//     label: "State",
//     description:
//       "Create a state-level administrative hierarchy node.",
//   },

//   DISTRICT: {
//     label: "District",
//     description:
//       "Create a district under an existing state.",
//   },

//   PINCODE: {
//     label: "Pincode",
//     description:
//       "Create a pincode-level operational scope.",
//   },
// };

// function getInitialForm(
//   nodeType: HierarchyNodeType
// ): HierarchyNodeCreateData {
//   return {
//     nodeType,
//     nodeName: "",
//     nodeCode: "",
//     stateId: "",
//     stateName: "",
//     districtId: "",
//     districtName: "",
//     pincode: "",
//     description: "",
//   };
// }

// export default function NodeCreateModal({
//   isOpen,
//   onClose,
//   onSubmit,
//   states = [],
//   districts = [],
//   defaultNodeType = "STATE",
//   loading = false,
//   title = "Create Hierarchy Node",
//   submitLabel = "Create Node",
// }: NodeCreateModalProps) {
//   const [
//     form,
//     setForm,
//   ] = useState<HierarchyNodeCreateData>(
//     getInitialForm(
//       defaultNodeType
//     )
//   );

//   const [
//     error,
//     setError,
//   ] = useState("");

//   useEffect(() => {
//     if (!isOpen) {
//       return;
//     }

//     setForm(
//       getInitialForm(
//         defaultNodeType
//       )
//     );

//     setError("");
//   }, [
//     isOpen,
//     defaultNodeType,
//   ]);

//   if (!isOpen) {
//     return null;
//   }

//   const selectedState =
//     states.find(
//       (state) =>
//         state.id === form.stateId
//     );

//   const availableDistricts =
//     form.stateId
//       ? districts.filter(
//           (district) =>
//             district.id
//               .toLowerCase()
//               .startsWith(
//                 form.stateId
//                   .toLowerCase()
//               ) ||
//             district.code
//               ?.toLowerCase()
//               .startsWith(
//                 form.stateId
//                   .toLowerCase()
//               )
//         )
//       : districts;

//   const handleNodeTypeChange = (
//     nodeType: HierarchyNodeType
//   ) => {
//     setForm(
//       getInitialForm(
//         nodeType
//       )
//     );

//     setError("");
//   };

//   const handleChange = (
//     field: keyof HierarchyNodeCreateData,
//     value: string
//   ) => {
//     setForm(
//       (current) => ({
//         ...current,
//         [field]: value,
//       })
//     );

//     if (error) {
//       setError("");
//     }
//   };

//   const handleStateChange = (
//     stateId: string
//   ) => {
//     const state =
//       states.find(
//         (item) =>
//           item.id === stateId
//       );

//     setForm(
//       (current) => ({
//         ...current,
//         stateId,
//         stateName:
//           state?.name ?? "",
//         districtId: "",
//         districtName: "",
//       })
//     );

//     setError("");
//   };

//   const handleDistrictChange = (
//     districtId: string
//   ) => {
//     const district =
//       districts.find(
//         (item) =>
//           item.id ===
//           districtId
//       );

//     setForm(
//       (current) => ({
//         ...current,
//         districtId,
//         districtName:
//           district?.name ?? "",
//       })
//     );

//     setError("");
//   };

//   const validateForm =
//     (): boolean => {
//       if (
//         !form.nodeName.trim()
//       ) {
//         setError(
//           "Node name is required."
//         );
//         return false;
//       }

//       if (
//         !form.nodeCode.trim()
//       ) {
//         setError(
//           "Node code is required."
//         );
//         return false;
//       }

//       if (
//         form.nodeType ===
//           "DISTRICT" &&
//         !form.stateId
//       ) {
//         setError(
//           "Please select a state."
//         );
//         return false;
//       }

//       if (
//         form.nodeType ===
//           "PINCODE" &&
//         !form.stateId
//       ) {
//         setError(
//           "Please select a state."
//         );
//         return false;
//       }

//       if (
//         form.nodeType ===
//           "PINCODE" &&
//         !form.districtId
//       ) {
//         setError(
//           "Please select a district."
//         );
//         return false;
//       }

//       if (
//         form.nodeType ===
//           "PINCODE"
//       ) {
//         const cleanPincode =
//           form.pincode
//             ?.trim() ?? "";

//         if (
//           !/^\d{6}$/.test(
//             cleanPincode
//           )
//         ) {
//           setError(
//             "Pincode must contain exactly 6 digits."
//           );
//           return false;
//         }
//       }

//       return true;
//     };

//   const handleSubmit = async (
//     event: FormEvent<HTMLFormElement>
//   ) => {
//     event.preventDefault();

//     if (loading) {
//       return;
//     }

//     if (!validateForm()) {
//       return;
//     }

//     const cleanData: HierarchyNodeCreateData =
//       {
//         nodeType:
//           form.nodeType,

//         nodeName:
//           form.nodeName.trim(),

//         nodeCode:
//           form.nodeCode
//             .trim()
//             .toUpperCase(),

//         stateId:
//           form.stateId
//             ?.trim() || undefined,

//         stateName:
//           form.stateName
//             ?.trim() || undefined,

//         districtId:
//           form.districtId
//             ?.trim() || undefined,

//         districtName:
//           form.districtName
//             ?.trim() || undefined,

//         pincode:
//           form.nodeType ===
//           "PINCODE"
//             ? form.pincode?.trim()
//             : undefined,

//         description:
//           form.description
//             ?.trim() || undefined,
//       };

//     try {
//       await onSubmit?.(
//         cleanData
//       );
//     } catch (submitError) {
//       setError(
//         submitError instanceof Error
//           ? submitError.message
//           : "Unable to create hierarchy node."
//       );
//     }
//   };

//   const handleClose = () => {
//     if (loading) {
//       return;
//     }

//     onClose();
//   };

//   return (
//     <div
//       className="fixed inset-0 z-[160] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="node-create-modal-title"
//     >
//       <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

//         {/* HEADER */}

//         <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">

//           <div>

//             <div className="flex items-center gap-3">

//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">

//                 <HierarchyIcon />

//               </div>

//               <div>

//                 <h2
//                   id="node-create-modal-title"
//                   className="text-base font-black text-slate-900"
//                 >
//                   {title}
//                 </h2>

//                 <p className="mt-1 text-[9px] leading-4 text-slate-500">
//                   Add a hierarchy node within the
//                   JUERP administrative scope.
//                 </p>

//               </div>

//             </div>

//           </div>

//           <button
//             type="button"
//             onClick={handleClose}
//             disabled={loading}
//             aria-label="Close"
//             className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg font-bold text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
//           >
//             ×
//           </button>

//         </div>

//         {/* CONTENT */}

//         <form
//           onSubmit={handleSubmit}
//           className="min-h-0 flex-1 overflow-y-auto"
//         >

//           <div className="space-y-5 px-5 py-5 sm:px-6">

//             {/* NODE TYPE */}

//             <section>

//               <FieldLabel>
//                 Node Type
//               </FieldLabel>

//               <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">

//                 {(
//                   Object.keys(
//                     NODE_TYPE_CONFIG
//                   ) as HierarchyNodeType[]
//                 ).map(
//                   (nodeType) => {
//                     const config =
//                       NODE_TYPE_CONFIG[
//                         nodeType
//                       ];

//                     const selected =
//                       form.nodeType ===
//                       nodeType;

//                     return (
//                       <button
//                         key={
//                           nodeType
//                         }
//                         type="button"
//                         disabled={
//                           loading
//                         }
//                         onClick={() =>
//                           handleNodeTypeChange(
//                             nodeType
//                           )
//                         }
//                         className={`rounded-xl border p-3 text-left transition ${
//                           selected
//                             ? "border-orange-400 bg-orange-50 ring-2 ring-orange-100"
//                             : "border-slate-200 bg-white hover:border-orange-200 hover:bg-orange-50/40"
//                         }`}
//                       >

//                         <div className="flex items-center justify-between gap-2">

//                           <span
//                             className={`text-[10px] font-black ${
//                               selected
//                                 ? "text-orange-700"
//                                 : "text-slate-700"
//                             }`}
//                           >
//                             {
//                               config.label
//                             }
//                           </span>

//                           {selected && (
//                             <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-black text-white">
//                               ✓
//                             </span>
//                           )}

//                         </div>

//                         <p className="mt-1 text-[8px] leading-4 text-slate-400">
//                           {
//                             config.description
//                           }
//                         </p>

//                       </button>
//                     );
//                   }
//                 )}

//               </div>

//             </section>

//             {/* BASIC INFORMATION */}

//             <section className="space-y-4">

//               <div>

//                 <FieldLabel required>
//                   Node Name
//                 </FieldLabel>

//                 <input
//                   type="text"
//                   value={
//                     form.nodeName
//                   }
//                   onChange={(
//                     event
//                   ) =>
//                     handleChange(
//                       "nodeName",
//                       event.target
//                         .value
//                     )
//                   }
//                   placeholder={
//                     form.nodeType ===
//                     "STATE"
//                       ? "Example: Andhra Pradesh"
//                       : form.nodeType ===
//                         "DISTRICT"
//                       ? "Example: Guntur"
//                       : "Example: Guntur Main"
//                   }
//                   disabled={loading}
//                   className="form-input"
//                 />

//               </div>

//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

//                 <div>

//                   <FieldLabel required>
//                     Node Code
//                   </FieldLabel>

//                   <input
//                     type="text"
//                     value={
//                       form.nodeCode
//                     }
//                     onChange={(
//                       event
//                     ) =>
//                       handleChange(
//                         "nodeCode",
//                         event.target
//                           .value
//                       )
//                     }
//                     placeholder={
//                       form.nodeType ===
//                       "STATE"
//                         ? "Example: AP"
//                         : form.nodeType ===
//                           "DISTRICT"
//                         ? "Example: GNT"
//                         : "Example: GNT-001"
//                     }
//                     disabled={loading}
//                     className="form-input uppercase"
//                   />

//                   <p className="mt-1 text-[8px] text-slate-400">
//                     Use the canonical code
//                     configured for this node.
//                   </p>

//                 </div>

//                 <div>

//                   <FieldLabel>
//                     Status
//                   </FieldLabel>

//                   <div className="flex h-[42px] items-center rounded-xl border border-slate-200 bg-slate-50 px-3">

//                     <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-2.5 py-1 text-[8px] font-black text-amber-700">

//                       <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />

//                       DRAFT

//                     </span>

//                   </div>

//                   <p className="mt-1 text-[8px] text-slate-400">
//                     Final activation is controlled
//                     by authorized JUERP workflow.
//                   </p>

//                 </div>

//               </div>

//             </section>

//             {/* STATE */}

//             {(form.nodeType ===
//               "DISTRICT" ||
//               form.nodeType ===
//                 "PINCODE") && (
//               <section>

//                 <FieldLabel required>
//                   State
//                 </FieldLabel>

//                 {states.length >
//                 0 ? (
//                   <select
//                     value={
//                       form.stateId
//                     }
//                     onChange={(
//                       event
//                     ) =>
//                       handleStateChange(
//                         event.target
//                           .value
//                       )
//                     }
//                     disabled={
//                       loading
//                     }
//                     className="form-input"
//                   >
//                     <option value="">
//                       Select state
//                     </option>

//                     {states.map(
//                       (
//                         state
//                       ) => (
//                         <option
//                           key={
//                             state.id
//                           }
//                           value={
//                             state.id
//                           }
//                         >
//                           {
//                             state.name
//                           }
//                           {state.code
//                             ? ` (${state.code})`
//                             : ""}
//                         </option>
//                       )
//                     )}

//                   </select>
//                 ) : (
//                   <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">

//                     <p className="text-[9px] font-bold text-amber-700">
//                       No state options are
//                       available.
//                     </p>

//                     <p className="mt-1 text-[8px] leading-4 text-amber-600">
//                       Load authorized hierarchy
//                       data before creating a
//                       district or pincode node.
//                     </p>

//                   </div>
//                 )}

//                 {selectedState && (
//                   <p className="mt-1 text-[8px] text-slate-400">
//                     Selected:{" "}
//                     {
//                       selectedState.name
//                     }
//                   </p>
//                 )}

//               </section>
//             )}

//             {/* DISTRICT */}

//             {form.nodeType ===
//               "PINCODE" && (
//               <section>

//                 <FieldLabel required>
//                   District
//                 </FieldLabel>

//                 <select
//                   value={
//                     form.districtId
//                   }
//                   onChange={(
//                     event
//                   ) =>
//                     handleDistrictChange(
//                       event.target
//                         .value
//                     )
//                   }
//                   disabled={
//                     loading ||
//                     !form.stateId
//                   }
//                   className="form-input disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
//                 >

//                   <option value="">
//                     {!form.stateId
//                       ? "Select state first"
//                       : "Select district"}
//                   </option>

//                   {availableDistricts.map(
//                     (
//                       district
//                     ) => (
//                       <option
//                         key={
//                           district.id
//                         }
//                         value={
//                           district.id
//                         }
//                       >
//                         {
//                           district.name
//                         }
//                         {district.code
//                           ? ` (${district.code})`
//                           : ""}
//                       </option>
//                     )
//                   )}

//                 </select>

//                 {form.stateId &&
//                   availableDistricts.length ===
//                     0 && (
//                     <p className="mt-1 text-[8px] text-amber-600">
//                       No districts are
//                       available for the
//                       selected state.
//                     </p>
//                   )}

//               </section>
//             )}

//             {/* PINCODE */}

//             {form.nodeType ===
//               "PINCODE" && (
//               <section>

//                 <FieldLabel required>
//                   Pincode
//                 </FieldLabel>

//                 <input
//                   type="text"
//                   inputMode="numeric"
//                   maxLength={6}
//                   value={
//                     form.pincode
//                   }
//                   onChange={(
//                     event
//                   ) =>
//                     handleChange(
//                       "pincode",
//                       event.target.value.replace(
//                         /\D/g,
//                         ""
//                       )
//                     )
//                   }
//                   placeholder="Example: 522001"
//                   disabled={loading}
//                   className="form-input"
//                 />

//                 <p className="mt-1 text-[8px] text-slate-400">
//                   Enter the six-digit Indian
//                   pincode used by the authorized
//                   hierarchy configuration.
//                 </p>

//               </section>
//             )}

//             {/* DESCRIPTION */}

//             <section>

//               <FieldLabel>
//                 Description
//               </FieldLabel>

//               <textarea
//                 value={
//                   form.description
//                 }
//                 onChange={(
//                   event
//                 ) =>
//                   handleChange(
//                     "description",
//                     event.target
//                       .value
//                   )
//                 }
//                 rows={4}
//                 disabled={loading}
//                 placeholder="Enter an optional description for this hierarchy node..."
//                 className="form-input min-h-[100px] resize-y"
//               />

//             </section>

//             {/* ERROR */}

//             {error && (
//               <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">

//                 <div className="flex items-start gap-2">

//                   <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-[10px] font-black text-red-600">
//                     !
//                   </span>

//                   <p className="text-[9px] font-semibold leading-4 text-red-700">
//                     {error}
//                   </p>

//                 </div>

//               </div>
//             )}

//             {/* GOVERNANCE */}

//             <div className="rounded-xl border border-orange-100 bg-orange-50/70 p-4">

//               <p className="text-[8px] font-black uppercase tracking-wider text-orange-800">
//                 Hierarchy Governance
//               </p>

//               <p className="mt-1 text-[9px] leading-4 text-orange-700">
//                 Creating a node is a protected
//                 administrative operation. The
//                 trusted backend/JuERP authority
//                 must validate the node code,
//                 parent scope, uniqueness,
//                 authorization scope, and final
//                 activation before the hierarchy
//                 becomes operational.
//               </p>

//             </div>

//           </div>

//           {/* FOOTER */}

//           <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50/70 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">

//             <button
//               type="button"
//               onClick={handleClose}
//               disabled={loading}
//               className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={loading}
//               className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-xs font-black text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {loading && (
//                 <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
//               )}

//               {loading
//                 ? "Creating..."
//                 : submitLabel}
//             </button>

//           </div>

//         </form>

//       </div>

//       <style jsx>{`
//         .form-input {
//           width: 100%;
//           border-radius: 0.75rem;
//           border: 1px solid rgb(226 232 240);
//           background: white;
//           padding: 0.7rem 0.85rem;
//           font-size: 0.75rem;
//           font-weight: 600;
//           color: rgb(51 65 85);
//           outline: none;
//           transition: all 150ms ease;
//         }

//         .form-input::placeholder {
//           color: rgb(148 163 184);
//           font-weight: 500;
//         }

//         .form-input:focus {
//           border-color: rgb(251 146 60);
//           box-shadow:
//             0 0 0 3px
//             rgb(255 237 213);
//         }

//         .form-input:disabled {
//           cursor: not-allowed;
//           background: rgb(248 250 252);
//           color: rgb(148 163 184);
//         }
//       `}</style>
//     </div>
//   );
// }

// function FieldLabel({
//   children,
//   required = false,
// }: {
//   children: React.ReactNode;
//   required?: boolean;
// }) {
//   return (
//     <label className="mb-1.5 block text-[9px] font-black uppercase tracking-wider text-slate-500">
//       {children}

//       {required && (
//         <span className="ml-1 text-red-500">
//           *
//         </span>
//       )}
//     </label>
//   );
// }

// function HierarchyIcon() {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       className="h-5 w-5"
//       aria-hidden="true"
//     >
//       <rect
//         x="8"
//         y="3"
//         width="8"
//         height="5"
//         rx="1"
//       />

//       <rect
//         x="3"
//         y="16"
//         width="7"
//         height="5"
//         rx="1"
//       />

//       <rect
//         x="14"
//         y="16"
//         width="7"
//         height="5"
//         rx="1"
//       />

//       <path
//         strokeLinecap="round"
//         d="M12 8v4M6.5 16v-4h11v4M12 12H6.5M12 12h5.5"
//       />
//     </svg>
//   );
// }

"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

export type HierarchyNodeType =
  | "STATE"
  | "DISTRICT"
  | "PINCODE";

export interface HierarchyNodeCreateData {
  nodeType: HierarchyNodeType;
  nodeName: string;
  nodeCode: string;
  stateId?: string;
  stateName?: string;
  districtId?: string;
  districtName?: string;
  pincode?: string;
  description?: string;
}

export interface HierarchyOption {
  id: string;
  name: string;
  code?: string;
}

interface NodeCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (
    data: HierarchyNodeCreateData
  ) => void | Promise<void>;
  states?: HierarchyOption[];
  districts?: HierarchyOption[];
  defaultNodeType?: HierarchyNodeType;
  loading?: boolean;
  title?: string;
  submitLabel?: string;
}

const NODE_TYPE_CONFIG: Record<
  HierarchyNodeType,
  {
    label: string;
    description: string;
  }
> = {
  STATE: {
    label: "State",
    description:
      "Create a state-level administrative hierarchy node.",
  },
  DISTRICT: {
    label: "District",
    description:
      "Create a district under an existing state.",
  },
  PINCODE: {
    label: "Pincode",
    description:
      "Create a pincode-level operational scope.",
  },
};

function getInitialForm(
  nodeType: HierarchyNodeType
): HierarchyNodeCreateData {
  return {
    nodeType,
    nodeName: "",
    nodeCode: "",
    stateId: "",
    stateName: "",
    districtId: "",
    districtName: "",
    pincode: "",
    description: "",
  };
}

export default function NodeCreateModal({
  isOpen,
  onClose,
  onSubmit,
  states = [],
  districts = [],
  defaultNodeType = "STATE",
  loading = false,
  title = "Create Hierarchy Node",
  submitLabel = "Create Node",
}: NodeCreateModalProps) {
  const [form, setForm] = useState<HierarchyNodeCreateData>(
    getInitialForm(defaultNodeType)
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setForm(getInitialForm(defaultNodeType));
    setError("");
  }, [isOpen, defaultNodeType]);

  if (!isOpen) return null;

  const selectedState = states.find(
    (state) => state.id === form.stateId
  );

  const availableDistricts = form.stateId
    ? districts.filter(
        (district) =>
          district.id
            .toLowerCase()
            .startsWith(form.stateId!.toLowerCase()) ||
          district.code
            ?.toLowerCase()
            .startsWith(form.stateId!.toLowerCase())
      )
    : districts;

  const handleNodeTypeChange = (nodeType: HierarchyNodeType) => {
    setForm(getInitialForm(nodeType));
    setError("");
  };

  const handleChange = (
    field: keyof HierarchyNodeCreateData,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
    if (error) setError("");
  };

  const handleStateChange = (stateId: string) => {
    const state = states.find((item) => item.id === stateId);
    setForm((current) => ({
      ...current,
      stateId,
      stateName: state?.name ?? "",
      districtId: "",
      districtName: "",
    }));
    setError("");
  };

  const handleDistrictChange = (districtId: string) => {
    const district = districts.find(
      (item) => item.id === districtId
    );
    setForm((current) => ({
      ...current,
      districtId,
      districtName: district?.name ?? "",
    }));
    setError("");
  };

  const validateForm = (): boolean => {
    if (!form.nodeName.trim()) {
      setError("Node name is required.");
      return false;
    }
    if (!form.nodeCode.trim()) {
      setError("Node code is required.");
      return false;
    }
    if (form.nodeType === "DISTRICT" && !form.stateId) {
      setError("Please select a state.");
      return false;
    }
    if (form.nodeType === "PINCODE" && !form.stateId) {
      setError("Please select a state.");
      return false;
    }
    if (form.nodeType === "PINCODE" && !form.districtId) {
      setError("Please select a district.");
      return false;
    }
    if (form.nodeType === "PINCODE") {
      const cleanPincode = form.pincode?.trim() ?? "";
      if (!/^\d{6}$/.test(cleanPincode)) {
        setError("Pincode must contain exactly 6 digits.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (loading) return;
    if (!validateForm()) return;

    const cleanData: HierarchyNodeCreateData = {
      nodeType: form.nodeType,
      nodeName: form.nodeName.trim(),
      nodeCode: form.nodeCode.trim().toUpperCase(),
      stateId: form.stateId?.trim() || undefined,
      stateName: form.stateName?.trim() || undefined,
      districtId: form.districtId?.trim() || undefined,
      districtName: form.districtName?.trim() || undefined,
      pincode:
        form.nodeType === "PINCODE"
          ? form.pincode?.trim()
          : undefined,
      description: form.description?.trim() || undefined,
    };

    try {
      await onSubmit?.(cleanData);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to create hierarchy node."
      );
    }
  };

  const handleClose = () => {
    if (loading) return;
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[160] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="node-create-modal-title"
    >
      <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <HierarchyIcon />
              </div>
              <div>
                <h2
                  id="node-create-modal-title"
                  className="text-lg font-black text-slate-900"
                >
                  {title}
                </h2>
                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Add a hierarchy node within the JUERP
                  administrative scope.
                </p>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg font-bold text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ×
          </button>
        </div>

        {/* CONTENT */}
        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <div className="space-y-5 px-5 py-5 sm:px-6">
            {/* NODE TYPE */}
            <section>
              <FieldLabel>Node Type</FieldLabel>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {(
                  Object.keys(
                    NODE_TYPE_CONFIG
                  ) as HierarchyNodeType[]
                ).map((nodeType) => {
                  const config = NODE_TYPE_CONFIG[nodeType];
                  const selected = form.nodeType === nodeType;

                  return (
                    <button
                      key={nodeType}
                      type="button"
                      disabled={loading}
                      onClick={() => handleNodeTypeChange(nodeType)}
                      className={`rounded-xl border p-3.5 text-left transition ${
                        selected
                          ? "border-orange-400 bg-orange-50 ring-2 ring-orange-100"
                          : "border-slate-200 bg-white hover:border-orange-200 hover:bg-orange-50/40"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-sm font-black ${
                            selected
                              ? "text-orange-700"
                              : "text-slate-700"
                          }`}
                        >
                          {config.label}
                        </span>
                        {selected && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-black text-white">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-xs leading-4 text-slate-400">
                        {config.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* BASIC INFORMATION */}
            <section className="space-y-4">
              <div>
                <FieldLabel required>Node Name</FieldLabel>
                <input
                  type="text"
                  value={form.nodeName}
                  onChange={(event) =>
                    handleChange("nodeName", event.target.value)
                  }
                  placeholder={
                    form.nodeType === "STATE"
                      ? "Example: Andhra Pradesh"
                      : form.nodeType === "DISTRICT"
                        ? "Example: Guntur"
                        : "Example: Guntur Main"
                  }
                  disabled={loading}
                  className="form-input"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel required>Node Code</FieldLabel>
                  <input
                    type="text"
                    value={form.nodeCode}
                    onChange={(event) =>
                      handleChange("nodeCode", event.target.value)
                    }
                    placeholder={
                      form.nodeType === "STATE"
                        ? "Example: AP"
                        : form.nodeType === "DISTRICT"
                          ? "Example: GNT"
                          : "Example: GNT-001"
                    }
                    disabled={loading}
                    className="form-input uppercase"
                  />
                  <p className="mt-1.5 text-xs text-slate-400">
                    Use the canonical code configured for this node.
                  </p>
                </div>

                {/* <div>
                  <FieldLabel>Status</FieldLabel>
                  <div className="flex h-[46px] items-center rounded-xl border border-slate-200 bg-slate-50 px-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-black text-amber-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      DRAFT
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-400">
                    Final activation is controlled by authorized JUERP
                    workflow.
                  </p>
                </div> */}

                                <div>
                  <FieldLabel>Status</FieldLabel>
                  <div className="flex h-[46px] items-center rounded-xl border border-slate-200 bg-slate-50 px-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-2.5 py-1 text-xs font-black text-green-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      ACTIVE
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-400">
                    New nodes are created as ACTIVE and usable immediately.
                    You can change status later from Manage Status.
                  </p>
                </div>
              </div>
            </section>

            {/* STATE */}
            {(form.nodeType === "DISTRICT" ||
              form.nodeType === "PINCODE") && (
              <section>
                <FieldLabel required>State</FieldLabel>
                {states.length > 0 ? (
                  <select
                    value={form.stateId}
                    onChange={(event) =>
                      handleStateChange(event.target.value)
                    }
                    disabled={loading}
                    className="form-input"
                  >
                    <option value="">Select state</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                        {state.code ? ` (${state.code})` : ""}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                    <p className="text-sm font-bold text-amber-700">
                      No state options are available.
                    </p>
                    <p className="mt-1 text-xs leading-4 text-amber-600">
                      Load authorized hierarchy data before creating a
                      district or pincode node.
                    </p>
                  </div>
                )}
                {selectedState && (
                  <p className="mt-1.5 text-xs text-slate-400">
                    Selected: {selectedState.name}
                  </p>
                )}
              </section>
            )}

            {/* DISTRICT */}
            {form.nodeType === "PINCODE" && (
              <section>
                <FieldLabel required>District</FieldLabel>
                <select
                  value={form.districtId}
                  onChange={(event) =>
                    handleDistrictChange(event.target.value)
                  }
                  disabled={loading || !form.stateId}
                  className="form-input disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                >
                  <option value="">
                    {!form.stateId
                      ? "Select state first"
                      : "Select district"}
                  </option>
                  {availableDistricts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                      {district.code ? ` (${district.code})` : ""}
                    </option>
                  ))}
                </select>
                {form.stateId && availableDistricts.length === 0 && (
                  <p className="mt-1.5 text-xs text-amber-600">
                    No districts are available for the selected state.
                  </p>
                )}
              </section>
            )}

            {/* PINCODE */}
            {form.nodeType === "PINCODE" && (
              <section>
                <FieldLabel required>Pincode</FieldLabel>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={form.pincode}
                  onChange={(event) =>
                    handleChange(
                      "pincode",
                      event.target.value.replace(/\D/g, "")
                    )
                  }
                  placeholder="Example: 522001"
                  disabled={loading}
                  className="form-input"
                />
                <p className="mt-1.5 text-xs text-slate-400">
                  Enter the six-digit Indian pincode used by the
                  authorized hierarchy configuration.
                </p>
              </section>
            )}

            {/* DESCRIPTION */}
            <section>
              <FieldLabel>Description</FieldLabel>
              <textarea
                value={form.description}
                onChange={(event) =>
                  handleChange("description", event.target.value)
                }
                rows={4}
                disabled={loading}
                placeholder="Enter an optional description for this hierarchy node..."
                className="form-input min-h-[100px] resize-y"
              />
            </section>

            {/* ERROR */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <div className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-black text-red-600">
                    !
                  </span>
                  <p className="text-sm font-semibold leading-5 text-red-700">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {/* GOVERNANCE */}
            {/* <div className="rounded-xl border border-orange-100 bg-orange-50/70 p-4">
              <p className="text-xs font-black uppercase tracking-wider text-orange-800">
                Hierarchy Governance
              </p>
              <p className="mt-1.5 text-sm leading-5 text-orange-700">
                Creating a node is a protected administrative
                operation. The trusted backend/JuERP authority must
                validate the node code, parent scope, uniqueness,
                authorization scope, and final activation before the
                hierarchy becomes operational.
              </p>
            </div> */}

                        <div className="rounded-xl border border-orange-100 bg-orange-50/70 p-4">
              <p className="text-xs font-black uppercase tracking-wider text-orange-800">
                Hierarchy Governance
              </p>
              <p className="mt-1.5 text-sm leading-5 text-orange-700">
                Creating a node writes directly to Firestore (states /
                districts / pincodes) with status ACTIVE. Use Manage Status
                later to set INACTIVE or BLOCKED if needed.
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50/70 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              )}
              {loading ? "Creating..." : submitLabel}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .form-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(226 232 240);
          background: white;
          padding: 0.75rem 0.9rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: rgb(51 65 85);
          outline: none;
          transition: all 150ms ease;
        }

        .form-input::placeholder {
          color: rgb(148 163 184);
          font-weight: 500;
        }

        .form-input:focus {
          border-color: rgb(251 146 60);
          box-shadow: 0 0 0 3px rgb(255 237 213);
        }

        .form-input:disabled {
          cursor: not-allowed;
          background: rgb(248 250 252);
          color: rgb(148 163 184);
        }
      `}</style>
    </div>
  );
}

function FieldLabel({
  children,
  required = false,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-slate-500">
      {children}
      {required && (
        <span className="ml-1 text-red-500">*</span>
      )}
    </label>
  );
}

function HierarchyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="8" y="3" width="8" height="5" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
      <rect x="14" y="16" width="7" height="5" rx="1" />
      <path
        strokeLinecap="round"
        d="M12 8v4M6.5 16v-4h11v4M12 12H6.5M12 12h5.5"
      />
    </svg>
  );
}