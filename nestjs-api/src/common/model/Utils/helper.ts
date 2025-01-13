import { Setting } from '@app/common/interfaces';

export const applyLikeQuery = (filter: any) => {
  // Convert fields with string values to use regex for 'like' queries
  const updatedFilter: any = {};

  for (const [key, value] of Object.entries(filter)) {
    if (typeof value === 'string') {
      updatedFilter[key] = { $regex: new RegExp(value, 'i') }; // 'i' makes the search case-insensitive
    } else {
      updatedFilter[key] = value;
    }
  }

  return updatedFilter;
};

export function applyDynamicOrFilter(filters: any[]): any {
  const orConditions: any[] = [];

  objectToArray(filters).forEach((filter) => {
    for (const key in filter) {
      if (
        Object.keys(filters).includes(key) &&
        typeof filter[key] === 'string'
      ) {
        // If the key should use a LIKE query, apply $regex for a case-insensitive match
        orConditions.push({ [key]: { $regex: new RegExp(filter[key], 'i') } });
      } else {
        // Otherwise, use the exact match condition
        orConditions.push(filter);
      }
    }
  });

  // Return the filter with the $or condition
  return orConditions.length > 0 ? { $or: orConditions } : {};
}

function objectToArray(obj: any): any[] {
  return Object.keys(obj).map((key) => ({ [key]: obj[key] }));
}

export const filterSettingsByNameAndAppendFirst = (
  settings,
  name: string,
): Setting[] => {
  // Filter the settings based on the name
  const filteredSetting = settings.filter((setting) => setting.name === name);

  //  const filteredSetting = settings.filter(setting => setting.name === filterText);

  if (filteredSetting.length > 0) {
    settings[0] = filteredSetting;
  }

  // Return the first match or an empty object if no match is found
  return filteredSetting;
};
