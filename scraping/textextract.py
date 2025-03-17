import re
import json
import spacy

# Load spaCy for claim extraction
nlp = spacy.load("en_core_web_sm")

# Step 1: Text Preprocessing
def preprocess_text(text):
    """Preprocess text by converting to lowercase and removing special characters."""
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    return text

# Step 2: Claim Extraction
def extract_claims(text):
    """Extract claims from text using spaCy and rule-based heuristics."""
    doc = nlp(text)
    claims = []
    for sent in doc.sents:
        # Heuristic: Look for sentences with a verb and object
        has_verb = any(token.pos_ == "VERB" for token in sent)
        has_object = any(token.dep_ == "dobj" for token in sent)
        if has_verb and has_object:
            claims.append(sent.text)
    return claims

# Main Function
def main_function(text):
    """Process input text and extract claims."""
    # Preprocess text
    text = preprocess_text(text)

    # Extract claims
    claims = extract_claims(text)

    if not claims:
        return []
    
    # Save claims to a JSON file
    with open('claims.json', 'w') as f:
        json.dump(claims, f, indent=2)

    return claims