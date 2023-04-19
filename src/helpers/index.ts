

/**
 * ? NOTE: this function is specific to deepMapObject 
 * 
 * Given the current key and previous keys, it returns an object containing the keys array and whether the current key has a special callback assigned to it.
 * 
 * @param curKey - The current string key being processed.
 * @param prevKeys - An array of string keys representing the path to the current object.
 * @param specialCallbackConfigRecord - A Record of special keys and their corresponding callbacks.
 * @returns An object containing the keys array, full key string, and a boolean value indicating whether the current key has a special callback assigned to it.
 */
const getKeysInfo = (curKey: string, prevKeys?: string[], specialCallbackConfigRecord?: Record<string, any>) => {
    // append the current key into the keys array
    const keys = prevKeys?.length ? [...prevKeys, curKey] : [curKey];
    // check if a special callback is assigned to the key (has a matching key in specialCallbackConfigRecord)
    const isSpecialKey = specialCallbackConfigRecord && curKey in specialCallbackConfigRecord;
    return { keys, isSpecialKey }
}


/**
 * This function sets a value for a property of a nested object using an array of keys representing the address of the nested property
 * It recursively sets the value by creating a copy of the objects at each level of the nested keys, 
 * and then setting the value of the last key in the copy of the deepest level.
 * 
 * @param targetObject The target object to set the value for
 * @param keys An array of strings representing the address of the nested property
 * @param value The value to be set
 * @returns A new object with the updated value
 */
export const setNestedField: any = (targetObject: any, keys: string[], value: any) => {
    const [head, ...rest] = keys;
    if (rest.length === 0) {
        return { ...targetObject, [head]: value };
    }
    return {
        ...targetObject,
        [head]: setNestedField(
            targetObject[head] || {},
            rest,
            value
        ),
    };
};


export interface ICallbackTypeProps<T = any> {
    keys: string[];
    value: T; // string | number | File | null
}
export type callbackType = ({ keys, value }: ICallbackTypeProps) => any; // return null if not return specified

interface IDeepMapObject {
    data: Record<string, any>,
    prevKeys?: string[],
    regularCallback: callbackType,
    specialCallbackConfigRecord?: Record<
        string,
        callbackType
    >
}

/**
 * This function can be used to deeply iterate over an object and map it to a new structure with the help of two types of callbacks:
 * "regularCallback" and "specialCallback".
 * 
 * 1--- regularCallback: a callback that is called for each primitive property of the object. The callback receives an object with two properties, keys and value. keys represent an array of keys to the current property and value represents the current property's value.
 * 
 * 2--- specialCallbackConfigRecord: this is an optional parameter that can be used to specify which special callbacks should be called for certain keys of the object. This is an array of special keys and their corresponding callbacks.
 * 
 * 
 * For each property in the object, the function checks if it is a valid object, if it is a special key or if it is a primitive value.
 * If the property is a valid object, the function recursively calls itself on the property.
 * If the property is a special key, the function uses the corresponding callback specified in specialCallbackConfigRecord to render the property
 * If the property is a primitive value, the function calls regularCallback with an object containing the keys and value of the property.
 * 
 * @param args - An object containing data, prevKeys, regularCallback, and specialCallbackConfigRecord parameters.
 * @returns - An array of mapped objects.
*/
export const deepMapObject: any = (args: IDeepMapObject) => {
    const {
        data,
        prevKeys,
        regularCallback,
        specialCallbackConfigRecord
    } = args

    return Object.entries(data).map(([key, value]) => {
        const { keys, isSpecialKey } = getKeysInfo(key, prevKeys, specialCallbackConfigRecord)

        // Condition 1: value is a valid object
        if (typeof value === "object" && value !== null && !isSpecialKey) { // file is uploaded in an object and may be confused with form data objects
            // Recurse into nested objects
            return deepMapObject({
                data: value,
                prevKeys: keys,
                regularCallback,
                specialCallbackConfigRecord // TODO: Check if passing the specialRenderConfig is creating issues for the nested items (maybe nested special keys may not work properly)
            });
        }
        // Condition 2: key is special
        else if (isSpecialKey) {
            // Special case for file input
            const specialCallback = specialCallbackConfigRecord?.[key]

            if (!specialCallback) return null; // will not happen if isSpecialKey is truthy
            return specialCallback({ keys, value })

        }
        // Condition 3: value is primitive
        else {
            return regularCallback({ keys, value })
        }
    });
}
