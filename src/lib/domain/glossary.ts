export type GlossaryTermId = string;
export type GlossaryCategory = "condition" | "damageSource" | "damageType" | "keyword";

export type GlossaryTerm = {
    id: GlossaryTermId;
    category: GlossaryCategory;
};
