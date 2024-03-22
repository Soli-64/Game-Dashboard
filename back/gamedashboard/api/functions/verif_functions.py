

def is_valid_version(version: str):
    parts = version.split('.')
    print(parts)
    if len(parts) == 3:
        for part in parts:
            if part.isdigit() and part < 100 and part >= 0:
                return True
