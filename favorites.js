/* JABAA Shop V2 — local browser favorites. Never stores customer details, receipts, or payment data. */
(function () {
  'use strict';
  const DB_NAME = 'jabashop-favorites-v1';
  const STORE = 'favorites';
  function openDb() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) return reject(new Error('IndexedDB unavailable'));
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'id' });
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
      req.onblocked = () => reject(new Error('Database upgrade blocked'));
    });
  }
  async function transaction(mode, operation) {
    const db = await openDb();
    try {
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, mode);
        const store = tx.objectStore(STORE);
        const request = operation(store);
        let result;
        request.onsuccess = () => { result = request.result; };
        request.onerror = () => reject(request.error);
        tx.oncomplete = () => resolve(result);
        tx.onerror = () => reject(tx.error || new Error('Transaction failed'));
        tx.onabort = () => reject(tx.error || new Error('Transaction aborted'));
      });
    } finally { db.close(); }
  }
  const recordId = (owner, key) => JSON.stringify([String(owner), String(key)]);
  window.JabaaFavorites = Object.freeze({
    async list(owner) {
      const records = await transaction('readonly', store => store.getAll());
      return records.filter(record => record.owner === String(owner)).map(record => record.key);
    },
    save(owner, key) {
      return transaction('readwrite', store => store.put({ id: recordId(owner, key), owner: String(owner), key: String(key) }));
    },
    remove(owner, key) {
      return transaction('readwrite', store => store.delete(recordId(owner, key)));
    }
  });
})();
