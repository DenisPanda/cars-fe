export namespace urlHelpers {
  export const paginationParams = (page: number, pageSize: number): string => {
    return [
      `page=${page}`,
      `pageSize=${pageSize}`
    ].join('&')
  }

  export const sortParams = (sortAttribute: string, sortOrder: -1 | 1 = 1): string => {
    return [
      `sort=${sortAttribute}`,
      `sortOrder=${sortOrder}`
    ].join('&')
  }

  export const searchParams = (attribute: string, search: string) => {
    return `${attribute}=${search}`;
  }
}
