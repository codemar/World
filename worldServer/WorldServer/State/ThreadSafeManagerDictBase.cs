using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorldServer.State
{

    public abstract class ThreadSafeManagerDictBase<K, T>
    {
        protected OrderedDictionary objects = new OrderedDictionary();

        public int Count() {
            lock (this)
            {
                return objects.Count;
            }
        }

        public T[] Snapshot()
        {
            lock (this)
            {
                return objects.Values.Cast<T>().ToArray();
            }
        }

        public T Get(K key)
        {
            lock (this)
            {
                return (T) objects[key];
            }
        }

        public void Add(K key, T obj)
        {
            if (key == null || obj == null)
                return;
            lock (this)
            {
                objects[key] = obj;
            }
        }

        public void Remove(K key)
        {
            if (key == null)
                return;
            lock (this)
            {
                objects.Remove(key);
            }
        }

    }
}
