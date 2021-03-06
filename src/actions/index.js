export const selectMarker = info => {
    return {
        type: "SELECT_GUARDS",
        payload: info
    };
};

export const selectOnlineGuards = info => {
    return {
        type: "SELECT_ONLINE",
        payload: info
    };
};

export const changeRole = info => {
    return {
        type: "CHANGE_ROLE",
        payload: info
    };
};

export const helpBrigade = info => {
    return {
        type: "BRIGADE_HELPED",
        payload: info
    };
};

export const tempArray = info => {
    return {
        type: "TEMP_ARRAY",
        payload: info
    };
};

export const notifPressed = info => {
    return {
        type: "NOTIF_PRESSED",
        payload: info
    };
};
export const selectActiveCases = info => {
    return {
        type: "SELECT_ACTIVE_CASES",
        payload: info
    };
};

export const fillPlace = info => {
    return {
        type: "FILL_PLACE",
        payload: info
    };
};

export const fillCases = info => {
    return {
        type: "FILL_CASES",
        payload: info
    };
};

export const fillCode = info => {
    return {
        type: "FILL_CODE",
        payload: info
    };
};

export const fillCategory = info => {
    return {
        type: "FILL_CATEGORY",
        payload: info
    };
};

export const fillDescription = info => {
    return {
        type: "FILL_DESCRIPTION",
        payload: info
    };
};

export const selectAll = info => {
    return {
        type: "SELECT_ALL",
        payload: info
    };
};
