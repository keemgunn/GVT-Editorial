import os
import glob
import shutil
print('======== EXECUTING sass-glob-restore.py')



# 1. Restore the dev sass file
SOURCE_FILE = './template/_process/devsass.txt'
DESTINATION_FILE = "./template/main.scss"

backupfile = glob.glob(SOURCE_FILE, recursive=True)

if (len(backupfile) > 0) :
    shutil.copy2(SOURCE_FILE, DESTINATION_FILE)
    os.remove(SOURCE_FILE)
    print('  - BACKUP RESTORED:', DESTINATION_FILE)
else :
    print('  - BACKUP SKIPPED:', SOURCE_FILE, 'not exists.')

