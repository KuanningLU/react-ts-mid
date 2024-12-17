/**
 * Utility functions for API calls.
 */

export async function asyncGet(api: string): Promise<any> {
    try {
      const res: Response = await fetch(api);
      return await res.json();
    } catch (error) {
      console.error('GET Error:', error);
      throw error;
    }
  }
  
  export async function asyncPost(api: string, body: {} | FormData) {
    try {
      const res: Response = await fetch(api, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: body instanceof FormData ? body : JSON.stringify(body),
        mode: 'cors',
      });
      return await res.json();
    } catch (error) {
      console.error('POST Error:', error);
      throw error;
    }
  }
  
  // 新增 PUT 方法，支援更新操作
  export async function asyncPut(api: string, body: {} | FormData) {
    try {
      const res: Response = await fetch(api, {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: body instanceof FormData ? body : JSON.stringify(body),
        mode: 'cors',
      });
      return await res.json();
    } catch (error) {
      console.error('PUT Error:', error);
      throw error;
    }
  }
  
  export async function asyncPatch(api: string, body: {} | FormData) {
    try {
      const res: Response = await fetch(api, {
        method: 'PATCH',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: body instanceof FormData ? body : JSON.stringify(body),
        mode: 'cors',
      });
      return await res.json();
    } catch (error) {
      console.error('PATCH Error:', error);
      throw error;
    }
  }
  
  // DELETE 方法
  export async function asyncDelete(api: string, queryParams: { [key: string]: string }) {
    const url = new URL(api);
    Object.keys(queryParams).forEach((key) => url.searchParams.append(key, queryParams[key]));
  
    try {
      const res: Response = await fetch(url.toString(), {
        method: 'DELETE',
        mode: 'cors',
      });
      return await res.json();
    } catch (error) {
      console.error('DELETE Error:', error);
      throw error;
    }
  }