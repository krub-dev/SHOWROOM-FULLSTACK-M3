#!/bin/bash
# Integration Test Runner for Showroom API
# This script starts the server, runs tests, and cleans up

echo "🧪 Starting Integration Test Runner..."
echo ""

# Navigate to api-projects root directory
cd "$(dirname "$0")/.." || exit 1

# Start the server in the background
echo "🚀 Starting API server..."
node server.js &
SERVER_PID=$!

# Wait for server to be ready
echo "⏳ Waiting for server to be ready..."
sleep 3

# Check if server is running
if ! curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "❌ Server failed to start"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

echo "✅ Server is ready!"
echo ""

# Run the tests
echo "🧪 Running integration tests..."
npm test

# Capture test exit code
TEST_EXIT_CODE=$?

# Stop the server
echo ""
echo "🛑 Stopping server..."
kill $SERVER_PID 2>/dev/null
wait $SERVER_PID 2>/dev/null

# Exit with test exit code
if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo ""
    echo "✅ All tests passed!"
else
    echo ""
    echo "❌ Some tests failed"
fi

exit $TEST_EXIT_CODE
