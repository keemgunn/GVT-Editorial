# CAUTION ========================================
# This script is designed to be executed by a NPM Script inside of  'template/package.json'
# So relative paths are based on 'template/package.json'.

import os
import glob
import shutil
print('======== EXECUTING sass-glob-restore.py')


# 1. Restore the dev sass file
RESTORE_FILE = './tools/temp/devsass.txt'
DESTINATION_FILE = "./main.scss"

backupfile = glob.glob(RESTORE_FILE, recursive=True)

if (len(backupfile) > 0) :
    shutil.copy2(RESTORE_FILE, DESTINATION_FILE)
    os.remove(RESTORE_FILE)
    print('  - BACKUP RESTORED:', DESTINATION_FILE)
else :
    print('  - BACKUP SKIPPED:', RESTORE_FILE, 'not exists.')

