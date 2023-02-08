import os
import glob
import shutil
print('======== EXECUTING sass-glob-builder.py')



# 1. Copy the dev sass file
SOURCE_FILE = "./src/template/main.scss"
DESTINATION_FILE = './src/template/_process/devsass.txt'

backupfile = glob.glob(DESTINATION_FILE, recursive=True)

if (len(backupfile) > 0) :
    print('  - BACKUP SKIPPED:', DESTINATION_FILE, 'already exists.')
else :
    shutil.copy2(SOURCE_FILE, DESTINATION_FILE)
    print('  - BACKUP DONE:', DESTINATION_FILE)



# 2. Collect all sass file and rerite the main.scss
SRC_DIR = "./src"
OUTPUT_FILE = "./src/template/main.scss"

# Get a list of all files in the "src" directory and its sub-directories
files = [f for f in glob.glob(os.path.join(SRC_DIR, "**/*.scss"), recursive=True) 
         if (not f.endswith('main.scss'))]

# Write the list of files to the output file in the desired format
with open(OUTPUT_FILE, "w") as f:
    for file in files:
        f.write(f"@import '{file}';\n")

print('  - PROCESS DONE')
print(" ", len(files), ".scss files merged into", SRC_DIR, "\n\n")