#!/usr/bin/ruby

# Enable all rules by default
all

# Extend line length, since each sentence should be on a separate line.
rule 'MD013', :line_length => 99999, :ignore_code_blocks => true
