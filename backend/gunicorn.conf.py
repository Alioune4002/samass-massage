import multiprocessing


timeout = 90

workers = multiprocessing.cpu_count() * 2 + 1