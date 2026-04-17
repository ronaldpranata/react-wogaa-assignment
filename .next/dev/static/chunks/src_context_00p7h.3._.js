(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/context/ThemeContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeContext",
    ()=>ThemeContext,
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const ThemeProvider = ({ children })=>{
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('light');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            document.documentElement.setAttribute('data-theme', theme);
        }
    }["ThemeProvider.useEffect"], [
        theme
    ]);
    const toggleTheme = ()=>{
        setTheme((prev)=>prev === 'light' ? 'dark' : 'light');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            toggleTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/ThemeContext.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ThemeProvider, "Z8UCD9KudyQA62DCQ9e5cf9+m5k=");
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/context/TaskContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TaskContext",
    ()=>TaskContext,
    "TaskProvider",
    ()=>TaskProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const TaskContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const initialState = [];
const taskReducer = (state, action)=>{
    switch(action.type){
        case 'ADD_TASK':
            return [
                ...state,
                action.payload
            ];
        case 'TOGGLE_TASK':
            return state.map((task)=>task.id === action.payload ? {
                    ...task,
                    completed: !task.completed
                } : task);
        case 'DELETE_TASK':
            return state.filter((task)=>task.id !== action.payload);
        case 'SET_TASKS':
            return action.payload;
        default:
            return state;
    }
};
const TaskProvider = ({ children })=>{
    _s();
    const [tasks, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(taskReducer, initialState);
    // Fetch all tasks on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TaskProvider.useEffect": ()=>{
            fetch('/api/tasks').then({
                "TaskProvider.useEffect": (res)=>res.json()
            }["TaskProvider.useEffect"]).then({
                "TaskProvider.useEffect": (data)=>{
                    if (Array.isArray(data)) {
                        dispatch({
                            type: 'SET_TASKS',
                            payload: data
                        });
                    } else {
                        console.error('API Error:', data);
                        dispatch({
                            type: 'SET_TASKS',
                            payload: []
                        });
                    }
                }
            }["TaskProvider.useEffect"]).catch({
                "TaskProvider.useEffect": (err)=>console.error("Failed to load tasks", err)
            }["TaskProvider.useEffect"]);
        }
    }["TaskProvider.useEffect"], []);
    const addTask = async (title)=>{
        // Generate an optimistic ID so the UI updates immediately
        const optimisticTask = {
            id: crypto.randomUUID(),
            title,
            completed: false,
            createdAt: new Date().toISOString()
        };
        // 1. Optimistic Update
        dispatch({
            type: 'ADD_TASK',
            payload: optimisticTask
        });
        // 2. Persist to API
        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title
                })
            });
            const savedTask = await res.json();
            // Optionally replace the optimistic ID with the real DB ID here,
            // But we can also just fetch all tasks to sync perfectly:
            // (This guarantees order and real IDs)
            const allRes = await fetch('/api/tasks');
            const allTasks = await allRes.json();
            if (Array.isArray(allTasks)) {
                dispatch({
                    type: 'SET_TASKS',
                    payload: allTasks
                });
            }
        } catch (error) {
            console.error("Failed to add task", error);
        // Rollback logic could go here
        }
    };
    const toggleTask = async (id)=>{
        // 1. Optimistic Update
        dispatch({
            type: 'TOGGLE_TASK',
            payload: id
        });
        // 2. API Request
        fetch(`/api/tasks/${id}`, {
            method: 'PATCH'
        }).catch(console.error);
    };
    const deleteTask = async (id)=>{
        // 1. Optimistic Update
        dispatch({
            type: 'DELETE_TASK',
            payload: id
        });
        // 2. API Request
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE'
        }).catch(console.error);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TaskContext.Provider, {
        value: {
            tasks,
            addTask,
            toggleTask,
            deleteTask
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/TaskContext.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(TaskProvider, "pkmgK/9wMqXU36PsMyV9AaCqGV4=");
_c = TaskProvider;
var _c;
__turbopack_context__.k.register(_c, "TaskProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_context_00p7h.3._.js.map