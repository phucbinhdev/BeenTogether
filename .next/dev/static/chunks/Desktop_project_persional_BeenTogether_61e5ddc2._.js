(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/project/persional/BeenTogether/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MODEL_NAMES",
    ()=>MODEL_NAMES,
    "QUESTIONS",
    ()=>QUESTIONS
]);
const MODEL_NAMES = {
    ANALYZE_IMAGE: "gemini-3.0-pro",
    EDIT_IMAGE: "gemini-2.5-flash"
};
const QUESTIONS = [
    {
        id: 1,
        content: "Khoảnh khắc nào bên nhau khiến bạn cảm thấy hạnh phúc nhất?",
        category: "deep"
    },
    {
        id: 2,
        content: "Nếu chúng ta có thể đi du lịch bất cứ đâu ngay bây giờ, bạn sẽ chọn đi đâu?",
        category: "fun"
    },
    {
        id: 3,
        content: "Một thói quen của đối phương mà bạn thấy đáng yêu nhất là gì?",
        category: "deep"
    },
    {
        id: 4,
        content: "Điều điên rồ nhất mà bạn muốn chúng ta cùng làm là gì?",
        category: "spicy"
    },
    {
        id: 5,
        content: "Bạn ấn tượng gì nhất về đối phương trong lần đầu gặp mặt?",
        category: "deep"
    },
    {
        id: 6,
        content: "Món ăn nào đối phương nấu (hoặc mua) mà bạn thích nhất?",
        category: "fun"
    },
    {
        id: 7,
        content: "Nếu mô tả mối quan hệ của chúng ta bằng một bài hát, đó sẽ là bài gì?",
        category: "fun"
    },
    {
        id: 8,
        content: "Bạn mong muốn thay đổi điều gì ở bản thân để tốt hơn cho mối quan hệ này?",
        category: "deep"
    },
    {
        id: 9,
        content: "Kỉ niệm buồn cười nhất của chúng ta là gì?",
        category: "fun"
    },
    {
        id: 10,
        content: "Điều gì ở đối phương khiến bạn tự hào nhất khi kể với người khác?",
        category: "deep"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/project/persional/BeenTogether/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlayerTurn",
    ()=>PlayerTurn
]);
var PlayerTurn = /*#__PURE__*/ function(PlayerTurn) {
    PlayerTurn["PLAYER_1"] = "Người 1";
    PlayerTurn["PLAYER_2"] = "Người 2";
    return PlayerTurn;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/project/persional/BeenTogether/services/storageService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCustomQuestions",
    ()=>getCustomQuestions,
    "saveCustomQuestion",
    ()=>saveCustomQuestion
]);
const CUSTOM_QUESTIONS_KEY = "couple_connect_custom_questions";
const getCustomQuestions = ()=>{
    try {
        const stored = localStorage.getItem(CUSTOM_QUESTIONS_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Failed to load custom questions", e);
        return [];
    }
};
const saveCustomQuestion = (question)=>{
    try {
        const current = getCustomQuestions();
        const updated = [
            ...current,
            question
        ];
        localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(updated));
        return updated;
    } catch (e) {
        console.error("Failed to save custom question", e);
        return [];
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/project/persional/BeenTogether/utils/supabase/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/project/persional/BeenTogether/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/project/persional/BeenTogether/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://vnqkycymuhxpbjagqtil.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZucWt5Y3ltdWh4cGJqYWdxdGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzNzI1MzcsImV4cCI6MjA4Nzk0ODUzN30.6fdgEIfUlwSf9I1YuxzwRfdlgdaSsePgcJmyR6TpRlw");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl || "", supabaseAnonKey || "");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CardGame",
    ()=>CardGame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/persional/BeenTogether/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/persional/BeenTogether/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/persional/BeenTogether/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/persional/BeenTogether/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/Desktop/project/persional/BeenTogether/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/Desktop/project/persional/BeenTogether/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/project/persional/BeenTogether/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$services$2f$storageService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/persional/BeenTogether/services/storageService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/persional/BeenTogether/utils/supabase/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
const CardGame = ()=>{
    _s();
    // Combine default questions with custom ones
    const [deck, setDeck] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUESTIONS"]);
    const [currentCardIndex, setCurrentCardIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [turn, setTurn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerTurn"].PLAYER_1);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Add Question Modal State
    const [showAddModal, setShowAddModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newQuestionContent, setNewQuestionContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [newQuestionCategory, setNewQuestionCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("fun");
    // Drag State
    const [dragX, setDragX] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const startX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CardGame.useEffect": ()=>{
            const fetchQuestions = {
                "CardGame.useEffect.fetchQuestions": async ()=>{
                    try {
                        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("questions").select("*")// explicitly check handles both false and null if needed, or just neq true
                        .neq("is_hidden", true);
                        if (error) throw error;
                        if (data && data.length > 0) {
                            // Shuffle array so it's random each time
                            const shuffled = [
                                ...data
                            ].sort({
                                "CardGame.useEffect.fetchQuestions.shuffled": ()=>Math.random() - 0.5
                            }["CardGame.useEffect.fetchQuestions.shuffled"]);
                            setDeck(shuffled);
                        } else {
                            // Fallback if DB is empty
                            const custom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$services$2f$storageService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCustomQuestions"])();
                            setDeck([
                                ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUESTIONS"],
                                ...custom
                            ].sort({
                                "CardGame.useEffect.fetchQuestions": ()=>Math.random() - 0.5
                            }["CardGame.useEffect.fetchQuestions"]));
                        }
                    } catch (err) {
                        console.warn("Falling back to local questions due to Supabase error:", err);
                        const custom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$services$2f$storageService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCustomQuestions"])();
                        setDeck([
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUESTIONS"],
                            ...custom
                        ].sort({
                            "CardGame.useEffect.fetchQuestions": ()=>Math.random() - 0.5
                        }["CardGame.useEffect.fetchQuestions"]));
                    } finally{
                        setLoading(false);
                    }
                }
            }["CardGame.useEffect.fetchQuestions"];
            fetchQuestions();
        }
    }["CardGame.useEffect"], []);
    const handleNext = ()=>{
        setDragX(0); // Ensure drag is reset
        // Move to next card
        setCurrentCardIndex((prev)=>(prev + 1) % deck.length);
        setTurn((prev)=>prev === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerTurn"].PLAYER_1 ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerTurn"].PLAYER_2 : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerTurn"].PLAYER_1);
    };
    const handleAddQuestion = async ()=>{
        if (!newQuestionContent.trim()) return;
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$utils$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("questions").insert([
                {
                    content: newQuestionContent.trim(),
                    category: newQuestionCategory
                }
            ]).select();
            if (error) throw error;
            if (data && data.length > 0) {
                setDeck((prev)=>[
                        ...prev,
                        data[0]
                    ]);
            }
        } catch (err) {
            console.warn("Could not save to Supabase, saving locally", err);
            const newQuestion = {
                id: `custom-${Date.now()}`,
                content: newQuestionContent.trim(),
                category: newQuestionCategory,
                isCustom: true
            };
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$services$2f$storageService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveCustomQuestion"])(newQuestion);
            setDeck((prev)=>[
                    ...prev,
                    newQuestion
                ]);
        }
        setNewQuestionContent("");
        setShowAddModal(false);
    };
    // Touch/Mouse Handlers
    const handleDragStart = (e)=>{
        setIsDragging(true);
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        startX.current = clientX;
    };
    const handleDragMove = (e)=>{
        if (!isDragging) return;
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        setDragX(clientX - startX.current);
    };
    const handleDragEnd = ()=>{
        setIsDragging(false);
        if (Math.abs(dragX) > 100) {
            handleNext();
        } else {
            setDragX(0); // Snap back
        }
    };
    // Helper to render a single card
    const renderCard = (index, isTop)=>{
        const question = deck[index % deck.length];
        // Style calculation
        let style = {};
        let className = "absolute top-0 left-0 w-full h-full rounded-3xl shadow-xl bg-white flex flex-col items-center justify-center p-8 text-center border border-slate-100 transition-transform duration-300 select-none";
        if (isTop) {
            className += " z-30 cursor-grab active:cursor-grabbing";
            style = {
                transform: `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`,
                transition: isDragging ? "none" : "transform 0.3s ease-out"
            };
        } else {
            // Stack effect
            const offsetIndex = index - currentCardIndex;
            const scale = 1 - offsetIndex * 0.05;
            const translateY = offsetIndex * 15; // move down slightly
            const opacity = 1 - offsetIndex * 0.3;
            className += ` z-${30 - offsetIndex * 10}`;
            style = {
                transform: `translateY(${translateY}px) scale(${scale})`,
                opacity: opacity
            };
        }
        const categoryColor = question.category === "deep" ? "bg-rose-100 text-rose-500" : question.category === "fun" ? "bg-blue-100 text-blue-500" : "bg-purple-100 text-purple-500";
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: className,
            style: style,
            onMouseDown: isTop ? handleDragStart : undefined,
            onTouchStart: isTop ? handleDragStart : undefined,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `mb-8 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${categoryColor}`,
                    children: [
                        question.isCustom ? "Tự tạo • " : "",
                        question.category
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                    lineNumber: 177,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-2xl font-serif font-medium text-slate-800 leading-relaxed max-w-[90%] pointer-events-none",
                    children: question.content
                }, void 0, false, {
                    fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                    lineNumber: 185,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-12 text-rose-400 pointer-events-none",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                        size: 28
                    }, void 0, false, {
                        fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                        lineNumber: 191,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                    lineNumber: 190,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, `${question.id}-${index}`, true, {
            fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
            lineNumber: 169,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center h-full w-full px-4 relative overflow-hidden",
        onMouseMove: handleDragMove,
        onMouseUp: handleDragEnd,
        onMouseLeave: handleDragEnd,
        onTouchMove: handleDragMove,
        onTouchEnd: handleDragEnd,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 w-full max-w-sm flex justify-between items-start z-40 px-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-serif font-bold text-slate-800",
                                children: [
                                    "Lượt của ",
                                    turn
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-slate-400 font-medium mt-1",
                                children: [
                                    deck.length > 0 ? currentCardIndex % deck.length + 1 : 0,
                                    " /",
                                    " ",
                                    deck.length
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                                lineNumber: 212,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                        lineNumber: 208,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowAddModal(true),
                        className: "flex items-center gap-1.5 px-4 py-2 bg-white border border-rose-200 text-rose-500 rounded-full text-sm font-semibold shadow-sm hover:bg-rose-50 transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                                lineNumber: 221,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            " Thêm câu hỏi"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                        lineNumber: 217,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-pulse w-12 h-12 bg-rose-200 rounded-full mb-4"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                        lineNumber: 227,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-500 font-medium",
                        children: "Đang tải câu hỏi..."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                        lineNumber: 228,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                lineNumber: 226,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : deck.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center text-center px-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-500 font-medium mb-4",
                        children: "Chưa có câu hỏi nào trong kho."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                        lineNumber: 232,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowAddModal(true),
                        className: "px-6 py-2.5 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600 transition-all shadow-md hover:shadow-lg hover:shadow-rose-300",
                        children: "Tạo câu hỏi đầu tiên"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                        lineNumber: 235,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                lineNumber: 231,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full max-w-sm aspect-[3/4] max-h-[65vh]",
                children: [
                    renderCard(currentCardIndex + 2, false),
                    renderCard(currentCardIndex + 1, false),
                    renderCard(currentCardIndex, true)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                lineNumber: 243,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            showAddModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/80",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-slate-800 text-lg",
                                    children: "Thêm câu hỏi mới"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                                    lineNumber: 257,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowAddModal(false),
                                    className: "text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200/50 transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                                        lineNumber: 264,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                                    lineNumber: 260,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                            lineNumber: 256,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 space-y-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wide",
                                            children: "Nội dung câu hỏi"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                                            lineNumber: 269,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: newQuestionContent,
                                            onChange: (e)=>setNewQuestionContent(e.target.value),
                                            className: "w-full border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none text-slate-700 bg-slate-50",
                                            rows: 3,
                                            placeholder: "Nhập câu hỏi của bạn..."
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                                            lineNumber: 272,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                                    lineNumber: 268,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wide",
                                            children: "Chủ đề"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                                            lineNumber: 281,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-3 gap-3",
                                            children: [
                                                "fun",
                                                "deep",
                                                "spicy"
                                            ].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setNewQuestionCategory(cat),
                                                    className: `py-2.5 rounded-xl text-sm font-semibold capitalize border transition-all ${newQuestionCategory === cat ? "border-rose-500 bg-rose-50 text-rose-600 shadow-sm" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`,
                                                    children: cat
                                                }, cat, false, {
                                                    fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                                                    lineNumber: 286,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                                            lineNumber: 284,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                                    lineNumber: 280,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleAddQuestion,
                                    disabled: !newQuestionContent.trim(),
                                    className: "w-full py-3.5 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600 transition-all disabled:opacity-50 hover:shadow-lg hover:shadow-rose-200 mt-2",
                                    children: "Tạo thẻ bài"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                                    lineNumber: 300,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                            lineNumber: 267,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                    lineNumber: 255,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
                lineNumber: 254,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CardGame, "Dyc3TkAdpSziWBIOevkIzTO40b8=");
_c = CardGame;
var _c;
__turbopack_context__.k.register(_c, "CardGame");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/project/persional/BeenTogether/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/persional/BeenTogether/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$components$2f$CardGame$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/persional/BeenTogether/components/CardGame.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/Desktop/project/persional/BeenTogether/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
"use client";
;
;
;
function App() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-slate-50 flex flex-col overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "bg-white/80 backdrop-blur-md z-50 border-b border-slate-200 shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto px-4 h-16 flex items-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center text-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                    size: 20,
                                    fill: "currentColor"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/project/persional/BeenTogether/app/page.tsx",
                                    lineNumber: 15,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/project/persional/BeenTogether/app/page.tsx",
                                lineNumber: 14,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "font-serif font-bold text-xl tracking-tight text-slate-900",
                                children: [
                                    "Couple",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-rose-500",
                                        children: "Connect"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/project/persional/BeenTogether/app/page.tsx",
                                        lineNumber: 18,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/project/persional/BeenTogether/app/page.tsx",
                                lineNumber: 17,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/project/persional/BeenTogether/app/page.tsx",
                        lineNumber: 13,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/project/persional/BeenTogether/app/page.tsx",
                    lineNumber: 12,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/project/persional/BeenTogether/app/page.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 relative flex flex-col overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$persional$2f$BeenTogether$2f$components$2f$CardGame$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardGame"], {}, void 0, false, {
                    fileName: "[project]/Desktop/project/persional/BeenTogether/app/page.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/project/persional/BeenTogether/app/page.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/project/persional/BeenTogether/app/page.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = App;
var _c;
__turbopack_context__.k.register(_c, "App");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_project_persional_BeenTogether_61e5ddc2._.js.map