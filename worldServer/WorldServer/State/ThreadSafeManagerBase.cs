using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyWosh.State
{

    public abstract class ThreadSafeManagerBase<T>
    {
        protected HashSet<T> objects = new HashSet<T>();

        public T[] Snapshot()
        {
            lock (this)
            {
                return objects.ToArray();
            }
        }

        public void Add(T obj)
        {
            if (obj == null)
                return;
            lock (this)
            {
                objects.Add(obj);
            }
        }

        public void Remove(T obj)
        {
            if (obj == null)
                return;
            lock (this)
            {
                if (objects.Remove(obj)) {
                    Console.WriteLine("FOUND AND REMOVED!!!");
                }
            }
        }

    }
}
